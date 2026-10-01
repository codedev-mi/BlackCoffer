const { Client } = require('@elastic/elasticsearch');
const dotenv = require('dotenv');
const sampleOrders = require('./seedData');

dotenv.config();

const ELASTICSEARCH_URL = process.env.ELASTICSEARCH_URL || 'http://localhost:9200';
const INDEX_NAME = process.env.INDEX_NAME || 'sales_orders';

// Official Elasticsearch Client
const client = new Client({
  node: ELASTICSEARCH_URL,
  maxRetries: 3,
  requestTimeout: 5000,
});

let isElasticsearchAvailable = false;
// In-memory document fallback store for standalone development resilience
let inMemoryStore = [...sampleOrders];

/**
 * Check connectivity to Elasticsearch node
 */
async function checkConnection() {
  try {
    const health = await client.ping();
    isElasticsearchAvailable = true;
    console.log(`[Elasticsearch] Connected successfully to node: ${ELASTICSEARCH_URL}`);
    return { connected: true, node: ELASTICSEARCH_URL };
  } catch (error) {
    isElasticsearchAvailable = false;
    console.warn(`[Elasticsearch] Could not connect to local node (${ELASTICSEARCH_URL}). Operating with built-in Elasticsearch Aggregation Engine.`);
    return { connected: false, mode: 'Memory Aggregation Engine' };
  }
}

/**
 * Initialize Index and Mappings in Elasticsearch
 */
async function createIndexIfNotExists() {
  if (!isElasticsearchAvailable) return;
  try {
    const exists = await client.indices.exists({ index: INDEX_NAME });
    if (!exists) {
      await client.indices.create({
        index: INDEX_NAME,
        body: {
          mappings: {
            properties: {
              orderId: { type: 'keyword' },
              customer: { type: 'text', fields: { keyword: { type: 'keyword' } } },
              category: { type: 'keyword' },
              product: { type: 'text', fields: { keyword: { type: 'keyword' } } },
              amount: { type: 'double' },
              status: { type: 'keyword' },
              region: { type: 'keyword' },
              date: { type: 'date', format: 'yyyy-MM-dd' }
            }
          }
        }
      });
      console.log(`[Elasticsearch] Created index '${INDEX_NAME}' with mapping.`);
    }
  } catch (err) {
    console.error(`[Elasticsearch] Index creation error:`, err.message);
  }
}

/**
 * Bulk Index Documents
 */
async function seedDocuments(documents = sampleOrders) {
  inMemoryStore = [...documents];

  if (isElasticsearchAvailable) {
    try {
      await createIndexIfNotExists();
      const operations = documents.flatMap(doc => [
        { index: { _index: INDEX_NAME, _id: doc.orderId } },
        doc
      ]);

      const bulkResponse = await client.bulk({ refresh: true, operations });
      if (bulkResponse.errors) {
        console.error('[Elasticsearch] Bulk seeding encountered errors.');
      } else {
        console.log(`[Elasticsearch] Successfully indexed ${documents.length} documents into '${INDEX_NAME}'.`);
      }
      return { success: true, count: documents.length, target: 'Elasticsearch' };
    } catch (err) {
      console.error('[Elasticsearch] Bulk indexing failed:', err.message);
    }
  }

  return { success: true, count: documents.length, target: 'Memory Aggregation Engine' };
}

/**
 * Filter documents in memory helper
 */
function applyFiltersToStore(docs, { search, category, status, region }) {
  return docs.filter(doc => {
    if (category && category !== 'All' && doc.category !== category) return false;
    if (status && status !== 'All' && doc.status !== status) return false;
    if (region && region !== 'All' && doc.region !== region) return false;
    if (search && search.trim() !== '') {
      const q = search.toLowerCase();
      const matchId = doc.orderId.toLowerCase().includes(q);
      const matchCustomer = doc.customer.toLowerCase().includes(q);
      const matchProduct = doc.product.toLowerCase().includes(q);
      if (!matchId && !matchCustomer && !matchProduct) return false;
    }
    return true;
  });
}

/**
 * 1. Summary Metrics API (Elasticsearch Metrics & Cardinality Aggregations)
 */
async function getSummary(filters = {}) {
  if (isElasticsearchAvailable) {
    try {
      const mustClauses = [];
      if (filters.category && filters.category !== 'All') mustClauses.push({ term: { category: filters.category } });
      if (filters.status && filters.status !== 'All') mustClauses.push({ term: { status: filters.status } });
      if (filters.region && filters.region !== 'All') mustClauses.push({ term: { region: filters.region } });

      const body = {
        size: 0,
        query: mustClauses.length > 0 ? { bool: { must: mustClauses } } : { match_all: {} },
        aggs: {
          total_sales: { sum: { field: 'amount' } },
          avg_order_value: { avg: { field: 'amount' } },
          total_customers: { cardinality: { field: 'customer.keyword' } }
        }
      };

      const res = await client.search({ index: INDEX_NAME, body });
      const totalOrders = res.hits.total.value;
      const totalSales = Math.round(res.aggregations.total_sales.value || 0);
      const averageOrderValue = Math.round(res.aggregations.avg_order_value.value || 0);
      const totalCustomers = res.aggregations.total_customers.value || 0;

      return { totalSales, totalOrders, averageOrderValue, totalCustomers, isElasticsearch: true };
    } catch (err) {
      console.warn('[Elasticsearch] getSummary failed, falling back:', err.message);
    }
  }

  // Standalone / Memory Aggregation implementation
  const filtered = applyFiltersToStore(inMemoryStore, filters);
  const totalOrders = filtered.length;
  const totalSales = filtered.reduce((acc, item) => acc + item.amount, 0);
  const averageOrderValue = totalOrders > 0 ? Math.round(totalSales / totalOrders) : 0;
  const uniqueCustomers = new Set(filtered.map(item => item.customer)).size;

  return { totalSales, totalOrders, averageOrderValue, totalCustomers: uniqueCustomers, isElasticsearch: false };
}

/**
 * 2. Sales Over Time (Elasticsearch Date Histogram Aggregation)
 */
async function getSalesOverTime(filters = {}) {
  if (isElasticsearchAvailable) {
    try {
      const mustClauses = [];
      if (filters.category && filters.category !== 'All') mustClauses.push({ term: { category: filters.category } });
      if (filters.status && filters.status !== 'All') mustClauses.push({ term: { status: filters.status } });
      if (filters.region && filters.region !== 'All') mustClauses.push({ term: { region: filters.region } });

      const body = {
        size: 0,
        query: mustClauses.length > 0 ? { bool: { must: mustClauses } } : { match_all: {} },
        aggs: {
          sales_over_time: {
            date_histogram: {
              field: 'date',
              calendar_interval: 'month',
              format: 'yyyy-MM'
            },
            aggs: {
              total_sales: { sum: { field: 'amount' } }
            }
          }
        }
      };

      const res = await client.search({ index: INDEX_NAME, body });
      const buckets = res.aggregations.sales_over_time.buckets;
      const formatted = buckets.map(b => ({
        month: b.key_as_string,
        sales: Math.round(b.total_sales.value),
        orders: b.doc_count
      }));
      return formatted;
    } catch (err) {
      console.warn('[Elasticsearch] getSalesOverTime failed, falling back:', err.message);
    }
  }

  const filtered = applyFiltersToStore(inMemoryStore, filters);
  const monthMap = {};

  filtered.forEach(item => {
    const month = item.date.substring(0, 7); // yyyy-MM
    if (!monthMap[month]) {
      monthMap[month] = { month, sales: 0, orders: 0 };
    }
    monthMap[month].sales += item.amount;
    monthMap[month].orders += 1;
  });

  return Object.values(monthMap).sort((a, b) => a.month.localeCompare(b.month));
}

/**
 * 3. Sales by Category (Elasticsearch Terms Aggregation)
 */
async function getCategoryAggs(filters = {}) {
  if (isElasticsearchAvailable) {
    try {
      const mustClauses = [];
      if (filters.category && filters.category !== 'All') mustClauses.push({ term: { category: filters.category } });
      if (filters.status && filters.status !== 'All') mustClauses.push({ term: { status: filters.status } });
      if (filters.region && filters.region !== 'All') mustClauses.push({ term: { region: filters.region } });

      const body = {
        size: 0,
        query: mustClauses.length > 0 ? { bool: { must: mustClauses } } : { match_all: {} },
        aggs: {
          categories: {
            terms: { field: 'category' },
            aggs: {
              total_sales: { sum: { field: 'amount' } }
            }
          }
        }
      };
      const res = await client.search({ index: INDEX_NAME, body });
      return res.aggregations.categories.buckets.map(b => ({
        category: b.key,
        count: b.doc_count,
        sales: Math.round(b.total_sales.value)
      }));
    } catch (err) {
      console.warn('[Elasticsearch] getCategoryAggs fallback:', err.message);
    }
  }

  const filtered = applyFiltersToStore(inMemoryStore, filters);
  const catMap = {};
  filtered.forEach(item => {
    if (!catMap[item.category]) {
      catMap[item.category] = { category: item.category, count: 0, sales: 0 };
    }
    catMap[item.category].count += 1;
    catMap[item.category].sales += item.amount;
  });
  return Object.values(catMap);
}

/**
 * 4. Orders by Region (Elasticsearch Terms Aggregation)
 */
async function getRegionAggs(filters = {}) {
  if (isElasticsearchAvailable) {
    try {
      const mustClauses = [];
      if (filters.category && filters.category !== 'All') mustClauses.push({ term: { category: filters.category } });
      if (filters.status && filters.status !== 'All') mustClauses.push({ term: { status: filters.status } });
      if (filters.region && filters.region !== 'All') mustClauses.push({ term: { region: filters.region } });

      const body = {
        size: 0,
        query: mustClauses.length > 0 ? { bool: { must: mustClauses } } : { match_all: {} },
        aggs: {
          regions: {
            terms: { field: 'region' },
            aggs: {
              total_sales: { sum: { field: 'amount' } }
            }
          }
        }
      };
      const res = await client.search({ index: INDEX_NAME, body });
      return res.aggregations.regions.buckets.map(b => ({
        region: b.key,
        count: b.doc_count,
        sales: Math.round(b.total_sales.value)
      }));
    } catch (err) {
      console.warn('[Elasticsearch] getRegionAggs fallback:', err.message);
    }
  }

  const filtered = applyFiltersToStore(inMemoryStore, filters);
  const regMap = {};
  filtered.forEach(item => {
    if (!regMap[item.region]) {
      regMap[item.region] = { region: item.region, count: 0, sales: 0 };
    }
    regMap[item.region].count += 1;
    regMap[item.region].sales += item.amount;
  });
  return Object.values(regMap);
}

/**
 * 5. Orders by Status (Elasticsearch Terms Aggregation)
 */
async function getStatusAggs(filters = {}) {
  if (isElasticsearchAvailable) {
    try {
      const mustClauses = [];
      if (filters.category && filters.category !== 'All') mustClauses.push({ term: { category: filters.category } });
      if (filters.status && filters.status !== 'All') mustClauses.push({ term: { status: filters.status } });
      if (filters.region && filters.region !== 'All') mustClauses.push({ term: { region: filters.region } });

      const body = {
        size: 0,
        query: mustClauses.length > 0 ? { bool: { must: mustClauses } } : { match_all: {} },
        aggs: {
          statuses: {
            terms: { field: 'status' }
          }
        }
      };
      const res = await client.search({ index: INDEX_NAME, body });
      return res.aggregations.statuses.buckets.map(b => ({
        status: b.key,
        count: b.doc_count
      }));
    } catch (err) {
      console.warn('[Elasticsearch] getStatusAggs fallback:', err.message);
    }
  }

  const filtered = applyFiltersToStore(inMemoryStore, filters);
  const statusMap = {};
  filtered.forEach(item => {
    if (!statusMap[item.status]) {
      statusMap[item.status] = { status: item.status, count: 0 };
    }
    statusMap[item.status].count += 1;
  });
  return Object.values(statusMap);
}

/**
 * 6. Search & Paginated Orders (Elasticsearch Bool Query & Multi-Match Search)
 */
async function searchOrders({ search = '', category = 'All', status = 'All', region = 'All', page = 1, limit = 10 }) {
  if (isElasticsearchAvailable) {
    try {
      const mustClauses = [];
      if (category !== 'All') mustClauses.push({ term: { category } });
      if (status !== 'All') mustClauses.push({ term: { status } });
      if (region !== 'All') mustClauses.push({ term: { region } });
      if (search && search.trim() !== '') {
        mustClauses.push({
          multi_match: {
            query: search,
            fields: ['orderId^3', 'customer^2', 'product'],
            fuzziness: 'AUTO'
          }
        });
      }

      const body = {
        from: (page - 1) * limit,
        size: limit,
        sort: [{ date: { order: 'desc' } }],
        query: mustClauses.length > 0 ? { bool: { must: mustClauses } } : { match_all: {} }
      };

      const res = await client.search({ index: INDEX_NAME, body });
      const orders = res.hits.hits.map(hit => hit._source);
      const total = res.hits.total.value;

      return {
        orders,
        total,
        page: Number(page),
        pages: Math.ceil(total / limit)
      };
    } catch (err) {
      console.warn('[Elasticsearch] searchOrders fallback:', err.message);
    }
  }

  const filtered = applyFiltersToStore(inMemoryStore, { search, category, status, region });
  const sorted = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));
  const total = sorted.length;
  const startIndex = (page - 1) * limit;
  const paginated = sorted.slice(startIndex, startIndex + Number(limit));

  return {
    orders: paginated,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit)
  };
}

module.exports = {
  client,
  checkConnection,
  createIndexIfNotExists,
  seedDocuments,
  getSummary,
  getSalesOverTime,
  getCategoryAggs,
  getRegionAggs,
  getStatusAggs,
  searchOrders
};
