const express = require('express');
const router = express.Router();
const {
  getSummary,
  getSalesOverTime,
  getCategoryAggs,
  getRegionAggs,
  getStatusAggs,
  searchOrders,
  seedDocuments,
  checkConnection
} = require('../elasticsearch');

/**
 * GET /api/dashboard/health
 * Returns connection state to Elasticsearch
 */
router.get('/health', async (req, res) => {
  try {
    const health = await checkConnection();
    res.json(health);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/dashboard/summary
 * Total Sales, Total Orders, Average Order Value, Total Customers
 */
router.get('/summary', async (req, res) => {
  try {
    const { category, status, region } = req.query;
    const summary = await getSummary({ category, status, region });
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve summary metrics', details: error.message });
  }
});

/**
 * GET /api/dashboard/sales-over-time
 * Monthly sales trend aggregation
 */
router.get('/sales-over-time', async (req, res) => {
  try {
    const { category, status, region } = req.query;
    const data = await getSalesOverTime({ category, status, region });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve sales over time data', details: error.message });
  }
});

/**
 * GET /api/dashboard/categories
 * Sales by category aggregation
 */
router.get('/categories', async (req, res) => {
  try {
    const { category, status, region } = req.query;
    const data = await getCategoryAggs({ category, status, region });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve category aggregations', details: error.message });
  }
});

/**
 * GET /api/dashboard/regions
 * Sales by region aggregation
 */
router.get('/regions', async (req, res) => {
  try {
    const { category, status, region } = req.query;
    const data = await getRegionAggs({ category, status, region });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve region aggregations', details: error.message });
  }
});

/**
 * GET /api/dashboard/statuses
 * Orders by status aggregation
 */
router.get('/statuses', async (req, res) => {
  try {
    const { category, status, region } = req.query;
    const data = await getStatusAggs({ category, status, region });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve status aggregations', details: error.message });
  }
});

/**
 * GET /api/dashboard/orders
 * Paginated order search & filtering
 */
router.get('/orders', async (req, res) => {
  try {
    const { search, category, status, region, page, limit } = req.query;
    const result = await searchOrders({
      search,
      category,
      status,
      region,
      page: Number(page) || 1,
      limit: Number(limit) || 10
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search orders', details: error.message });
  }
});

/**
 * POST /api/dashboard/seed
 * Seed sample data into Elasticsearch
 */
router.post('/seed', async (req, res) => {
  try {
    const result = await seedDocuments();
    res.json({ message: 'Seeding completed successfully', result });
  } catch (error) {
    res.status(500).json({ error: 'Seeding failed', details: error.message });
  }
});

module.exports = router;
