import React from 'react';
import { Search, Database, RefreshCw, Code, CheckCircle, AlertTriangle } from 'lucide-react';

export default function Navbar({ health, onSeed, onToggleInspector, showInspector, loading }) {
  const isConnected = health && health.connected;

  return (
    <header className="header-bar">
      <div className="brand-section">
        <div className="brand-icon">
          <Database size={26} color="#ffffff" />
        </div>
        <div>
          <h1 className="brand-title">Sales Analytics Dashboard</h1>
          <div className="brand-subtitle">
            <span>Powered by</span>
            <span style={{ color: '#ff9800', fontWeight: 700 }}>Elasticsearch</span>
            <span>+ Node.js Express + React</span>
          </div>
        </div>
      </div>

      <div className="header-actions">
        {/* Elasticsearch Health Badge */}
        <div className="status-badge">
          <div className={`status-dot ${isConnected ? 'active' : 'fallback'}`} />
          <span>
            {isConnected ? 'Elasticsearch Live' : 'Elasticsearch Proxy Mode'}
          </span>
          <span style={{ color: 'var(--text-dim)', fontSize: '0.72rem' }}>
            ({health?.node || health?.mode || 'localhost:9200'})
          </span>
        </div>

        {/* Aggregations Inspector Toggle */}
        <button 
          className={`btn ${showInspector ? 'btn-primary' : 'btn-outline'}`}
          onClick={onToggleInspector}
          title="Inspect Elasticsearch Queries & Aggregations"
        >
          <Code size={16} />
          <span>ES Query Inspector</span>
        </button>

        {/* Re-seed Button */}
        <button 
          className="btn btn-outline" 
          onClick={onSeed} 
          disabled={loading}
          title="Seed documents into Elasticsearch"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          <span>Seed ES Data</span>
        </button>
      </div>
    </header>
  );
}
