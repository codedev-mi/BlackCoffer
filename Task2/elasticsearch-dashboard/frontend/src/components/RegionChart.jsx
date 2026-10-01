import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { MapPin } from 'lucide-react';

const REGION_COLORS = ['#38bdf8', '#818cf8', '#34d399', '#fbbf24', '#f472b6'];

export default function RegionChart({ data }) {
  const formatYAxis = (tick) => `₹${(tick / 1000).toFixed(0)}k`;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div style={{
          background: '#1e293b',
          border: '1px solid rgba(255,255,255,0.15)',
          padding: '0.6rem 0.9rem',
          borderRadius: '8px'
        }}>
          <p style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.85rem' }}>
            Region: {d.region}
          </p>
          <p style={{ color: '#38bdf8', fontWeight: 600, fontSize: '0.85rem' }}>
            Sales: ₹{Number(d.sales).toLocaleString('en-IN')}
          </p>
          <p style={{ color: '#94a3b8', fontSize: '0.75rem' }}>
            Orders: {d.count}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card chart-card-sm">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">
            <MapPin size={18} color="#00d2ff" />
            Sales by Region
          </h3>
          <span className="chart-subtitle">ES <code>terms</code> bucket aggregation</span>
        </div>
      </div>

      <div style={{ width: '100%', height: 260 }}>
        {data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="region" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={formatYAxis} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="sales" radius={[6, 6, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={REGION_COLORS[index % REGION_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            No region aggregation data
          </div>
        )}
      </div>
    </div>
  );
}
