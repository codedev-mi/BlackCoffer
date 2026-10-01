import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Layers } from 'lucide-react';

const COLORS = ['#6366f1', '#10b981', '#ff9800', '#00d2ff', '#ec4899', '#8b5cf6'];

export default function CategoryChart({ data }) {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div style={{
          background: '#1e293b',
          border: '1px solid rgba(255,255,255,0.15)',
          padding: '0.75rem 1rem',
          borderRadius: '10px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
        }}>
          <p style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.2rem' }}>
            {d.category}
          </p>
          <p style={{ color: '#818cf8', fontWeight: 600, fontSize: '0.85rem' }}>
            Sales: ₹{Number(d.sales).toLocaleString('en-IN')}
          </p>
          <p style={{ color: '#94a3b8', fontSize: '0.78rem' }}>
            Orders Count: {d.count}
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
            <Layers size={18} color="#ff9800" />
            Sales by Category
          </h3>
          <span className="chart-subtitle">ES <code>terms</code> bucket aggregation</span>
        </div>
      </div>

      <div style={{ width: '100%', height: 320 }}>
        {data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
              <XAxis type="number" stroke="#94a3b8" fontSize={11} hide />
              <YAxis dataKey="category" type="category" stroke="#cbd5e1" fontSize={11} width={80} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="sales" radius={[0, 8, 8, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            No category aggregation data
          </div>
        )}
      </div>
    </div>
  );
}
