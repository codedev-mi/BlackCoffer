import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar } from 'lucide-react';

export default function SalesOverTimeChart({ data }) {
  const formatYAxis = (tickItem) => {
    if (tickItem >= 100000) return `₹${(tickItem / 100000).toFixed(1)}L`;
    if (tickItem >= 1000) return `₹${(tickItem / 1000).toFixed(0)}k`;
    return `₹${tickItem}`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: '#1e293b',
          border: '1px solid rgba(255,255,255,0.15)',
          padding: '0.75rem 1rem',
          borderRadius: '10px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
        }}>
          <p style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>
            Month: {label}
          </p>
          <p style={{ color: '#818cf8', fontWeight: 700, fontSize: '0.95rem' }}>
            Sales: ₹{Number(payload[0].value).toLocaleString('en-IN')}
          </p>
          {payload[1] && (
            <p style={{ color: '#34d399', fontWeight: 600, fontSize: '0.82rem' }}>
              Orders: {payload[1].value}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card chart-card-lg">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">
            <Calendar size={20} color="#818cf8" />
            Monthly Sales Trend
          </h3>
          <span className="chart-subtitle">Aggregated via Elasticsearch <code>date_histogram</code> bucket aggregation</span>
        </div>
      </div>

      <div style={{ width: '100%', height: 320 }}>
        {data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.5}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={formatYAxis} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="sales" 
                stroke="#6366f1" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#salesGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            No sales trend data available
          </div>
        )}
      </div>
    </div>
  );
}
