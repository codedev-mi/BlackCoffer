import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';

export default function FilterBar({
  search,
  setSearch,
  category,
  setCategory,
  status,
  setStatus,
  region,
  setRegion,
  onReset
}) {
  const categories = ['All', 'Electronics', 'Fashion', 'Home & Kitchen', 'Sports', 'Beauty & Health'];
  const statuses = ['All', 'Completed', 'Pending', 'Shipped', 'Cancelled'];
  const regions = ['All', 'North', 'South', 'East', 'West', 'Central'];

  return (
    <div className="glass-card filter-bar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
        <Filter size={18} />
        <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>ES Filters:</span>
      </div>

      {/* Live Search */}
      <div className="search-input-wrapper">
        <Search className="search-icon" size={16} />
        <input
          type="text"
          className="form-input"
          placeholder="Search orders (e.g. ORD-1001, Amit, Laptop)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Category Dropdown */}
      <select 
        className="form-select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="All">Category: All</option>
        {categories.filter(c => c !== 'All').map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Status Dropdown */}
      <select 
        className="form-select"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="All">Status: All</option>
        {statuses.filter(s => s !== 'All').map(st => (
          <option key={st} value={st}>{st}</option>
        ))}
      </select>

      {/* Region Dropdown */}
      <select 
        className="form-select"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
      >
        <option value="All">Region: All</option>
        {regions.filter(r => r !== 'All').map(reg => (
          <option key={reg} value={reg}>{reg}</option>
        ))}
      </select>

      {/* Reset Filters */}
      <button className="btn btn-outline" onClick={onReset} style={{ padding: '0.65rem 1rem' }}>
        <RotateCcw size={15} />
        <span>Reset</span>
      </button>
    </div>
  );
}
