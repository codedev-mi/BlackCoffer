import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PieChart as PieIcon } from 'lucide-react';

const STATUS_COLORS = {
  Completed: '#10b981',
  Pending: '#f59e0b',
  Shipped: '#3b82f6',
  Cancelled: '#ef4444'
};

export default function StatusChart({ data }) {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div style={{
          background: '#1e293b',
          border: '1px solid rgba(255,255,255,0.15)',
          padding: '0.6rem 0.9rem',
          borderRadius: '8px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.5)'
        }}>
          <p style={{ color: payload[0].color, fontWeight: 700, fontSize: '0.88rem' }}>
            {d.status}: {d.count} Orders
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
            <PieIcon size={18} color="#10b981" />
            Orders by Status
          </h3>
          <span className="chart-subtitle">ES <code>terms</code> aggregation</span>
        </div>
      </div>

      <div style={{ width: '100%', height: 260 }}>
        {data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={4}
                dataKey="count"
                nameKey="status"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={STATUS_COLORS[entry.status] || '#8b5cf6'} 
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle"
                wrapperStyle={{ fontSize: '0.78rem', color: '#94a3b8' }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            No status aggregation data
          </div>
        )}
      </div>
    </div>
  );
}
