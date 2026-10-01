import React from 'react';
import { DollarSign, ShoppingBag, TrendingUp, Users } from 'lucide-react';

export default function MetricCards({ summary, loading }) {
  const formatCurrency = (val) => {
    if (!val && val !== 0) return '₹0';
    return '₹' + Number(val).toLocaleString('en-IN');
  };

  return (
    <div className="metrics-grid">
      {/* Total Sales */}
      <div className="glass-card metric-card sales">
        <div className="metric-header">
          <span className="metric-title">Total Sales Revenue</span>
          <div className="metric-icon" style={{ color: '#818cf8', background: 'rgba(99, 102, 241, 0.15)' }}>
            <DollarSign size={20} />
          </div>
        </div>
        <div className="metric-value" style={{ color: '#818cf8' }}>
          {loading ? '...' : formatCurrency(summary?.totalSales)}
        </div>
        <div className="metric-footer">
          <TrendingUp size={14} color="#10b981" />
          <span style={{ color: '#10b981', fontWeight: 600 }}>ES sum agg</span>
          <span>across all indexed documents</span>
        </div>
      </div>

      {/* Total Orders */}
      <div className="glass-card metric-card orders">
        <div className="metric-header">
          <span className="metric-title">Total Orders</span>
          <div className="metric-icon" style={{ color: '#34d399', background: 'rgba(16, 185, 129, 0.15)' }}>
            <ShoppingBag size={20} />
          </div>
        </div>
        <div className="metric-value" style={{ color: '#34d399' }}>
          {loading ? '...' : Number(summary?.totalOrders || 0).toLocaleString('en-IN')}
        </div>
        <div className="metric-footer">
          <span style={{ color: '#34d399', fontWeight: 600 }}>ES hits.total</span>
          <span>matching document query</span>
        </div>
      </div>

      {/* Average Order Value */}
      <div className="glass-card metric-card aov">
        <div className="metric-header">
          <span className="metric-title">Avg Order Value (AOV)</span>
          <div className="metric-icon" style={{ color: '#fbbf24', background: 'rgba(251, 191, 36, 0.15)' }}>
            <TrendingUp size={20} />
          </div>
        </div>
        <div className="metric-value" style={{ color: '#fbbf24' }}>
          {loading ? '...' : formatCurrency(summary?.averageOrderValue)}
        </div>
        <div className="metric-footer">
          <span style={{ color: '#fbbf24', fontWeight: 600 }}>ES avg agg</span>
          <span>on amount field</span>
        </div>
      </div>

      {/* Total Customers */}
      <div className="glass-card metric-card customers">
        <div className="metric-header">
          <span className="metric-title">Total Customers</span>
          <div className="metric-icon" style={{ color: '#38bdf8', background: 'rgba(56, 189, 248, 0.15)' }}>
            <Users size={20} />
          </div>
        </div>
        <div className="metric-value" style={{ color: '#38bdf8' }}>
          {loading ? '...' : Number(summary?.totalCustomers || 0).toLocaleString('en-IN')}
        </div>
        <div className="metric-footer">
          <span style={{ color: '#38bdf8', fontWeight: 600 }}>ES cardinality agg</span>
          <span>unique customer count</span>
        </div>
      </div>
    </div>
  );
}
