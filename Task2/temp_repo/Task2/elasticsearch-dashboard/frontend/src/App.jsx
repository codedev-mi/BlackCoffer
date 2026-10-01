import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import MetricCards from './components/MetricCards';
import FilterBar from './components/FilterBar';
import SalesOverTimeChart from './components/SalesOverTimeChart';
import CategoryChart from './components/CategoryChart';
import StatusChart from './components/StatusChart';
import RegionChart from './components/RegionChart';
import OrdersTable from './components/OrdersTable';
import ElasticsearchInspector from './components/ElasticsearchInspector';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api/dashboard';

export default function App() {
  const [health, setHealth] = useState(null);
  const [summary, setSummary] = useState(null);
  const [salesOverTime, setSalesOverTime] = useState([]);
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [regions, setRegions] = useState([]);
  const [ordersData, setOrdersData] = useState({ orders: [], total: 0, pages: 1 });

  // Filters state
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [region, setRegion] = useState('All');
  const [page, setPage] = useState(1);

  // UI state
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [showInspector, setShowInspector] = useState(false);

  // Fetch ES Health
  const fetchHealth = async () => {
    try {
      const res = await axios.get(`${API_BASE}/health`);
      setHealth(res.data);
    } catch (err) {
      setHealth({ connected: false, mode: 'Disconnected' });
    }
  };

  // Fetch Dashboard Data
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const params = { category, status, region };
      
      const [summaryRes, timeRes, catRes, statusRes, regRes] = await Promise.all([
        axios.get(`${API_BASE}/summary`, { params }),
        axios.get(`${API_BASE}/sales-over-time`, { params }),
        axios.get(`${API_BASE}/categories`, { params }),
        axios.get(`${API_BASE}/statuses`, { params }),
        axios.get(`${API_BASE}/regions`, { params })
      ]);

      setSummary(summaryRes.data);
      setSalesOverTime(timeRes.data);
      setCategories(catRes.data);
      setStatuses(statusRes.data);
      setRegions(regRes.data);
    } catch (err) {
      console.error('Failed to load dashboard metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Paginated Orders
  const fetchOrders = async () => {
    try {
      const params = { search, category, status, region, page, limit: 10 };
      const res = await axios.get(`${API_BASE}/orders`, { params });
      setOrdersData(res.data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    }
  };

  // Seed Data Handler
  const handleSeed = async () => {
    setSeeding(true);
    try {
      await axios.post(`${API_BASE}/seed`);
      await fetchHealth();
      await fetchDashboardData();
      await fetchOrders();
    } catch (err) {
      alert('Seeding error: ' + err.message);
    } finally {
      setSeeding(false);
    }
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearch('');
    setCategory('All');
    setStatus('All');
    setRegion('All');
    setPage(1);
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [category, status, region]);

  useEffect(() => {
    fetchOrders();
  }, [search, category, status, region, page]);

  return (
    <div className="dashboard-container">
      {/* Header Bar */}
      <Navbar 
        health={health} 
        onSeed={handleSeed} 
        loading={seeding}
        showInspector={showInspector}
        onToggleInspector={() => setShowInspector(!showInspector)}
      />

      {/* Query Inspector Drawer */}
      {showInspector && (
        <ElasticsearchInspector onClose={() => setShowInspector(false)} />
      )}

      {/* KPI Metrics */}
      <MetricCards summary={summary} loading={loading} />

      {/* Filter & Search Bar */}
      <FilterBar 
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        status={status}
        setStatus={setStatus}
        region={region}
        setRegion={setRegion}
        onReset={handleResetFilters}
      />

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* Sales Over Time */}
        <SalesOverTimeChart data={salesOverTime} />

        {/* Sales by Category */}
        <CategoryChart data={categories} />

        {/* Orders by Status */}
        <StatusChart data={statuses} />

        {/* Sales by Region */}
        <RegionChart data={regions} />
      </div>

      {/* Orders Table */}
      <OrdersTable 
        ordersData={ordersData} 
        page={page} 
        setPage={setPage} 
        loading={loading}
      />

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '1.5rem 0',
        color: 'var(--text-muted)',
        fontSize: '0.82rem',
        borderTop: '1px solid var(--border-color)',
        marginTop: '2rem'
      }}>
        Sales Analytics Dashboard — Elasticsearch + Node.js + Express + React
      </footer>
    </div>
  );
}
