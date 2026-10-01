import React, { useState } from 'react';
import { ShoppingBag, Eye, ChevronLeft, ChevronRight, FileJson } from 'lucide-react';

export default function OrdersTable({ ordersData, page, setPage, loading }) {
  const [selectedDoc, setSelectedDoc] = useState(null);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Completed': return 'badge badge-completed';
      case 'Pending': return 'badge badge-pending';
      case 'Shipped': return 'badge badge-shipped';
      case 'Cancelled': return 'badge badge-cancelled';
      default: return 'badge';
    }
  };

  const { orders = [], total = 0, pages = 1 } = ordersData || {};

  return (
    <div className="glass-card" style={{ marginBottom: '2rem' }}>
      <div className="chart-header">
        <div>
          <h3 className="chart-title">
            <ShoppingBag size={18} color="#6366f1" />
            Recent Order Documents
          </h3>
          <span className="chart-subtitle">
            Retrieved via Elasticsearch query ({total} matching hits)
          </span>
        </div>

        {/* Pagination Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Page {page} of {pages || 1}
          </span>
          <button 
            className="btn btn-outline" 
            style={{ padding: '0.4rem 0.6rem' }} 
            disabled={page <= 1 || loading} 
            onClick={() => setPage(page - 1)}
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            className="btn btn-outline" 
            style={{ padding: '0.4rem 0.6rem' }} 
            disabled={page >= pages || loading} 
            onClick={() => setPage(page + 1)}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Category</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Region</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  Executing Elasticsearch document search...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  No matching order documents found in index.
                </td>
              </tr>
            ) : (
              orders.map((doc) => (
                <tr key={doc.orderId}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#818cf8' }}>
                    {doc.orderId}
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>{doc.date}</td>
                  <td style={{ fontWeight: 600 }}>{doc.customer}</td>
                  <td>
                    <span style={{
                      padding: '0.2rem 0.5rem',
                      background: 'rgba(255,255,255,0.06)',
                      borderRadius: '4px',
                      fontSize: '0.78rem'
                    }}>
                      {doc.category}
                    </span>
                  </td>
                  <td>{doc.product}</td>
                  <td style={{ fontWeight: 700 }}>₹{Number(doc.amount).toLocaleString('en-IN')}</td>
                  <td>{doc.region}</td>
                  <td>
                    <span className={getStatusBadgeClass(doc.status)}>
                      {doc.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-outline" 
                      style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                      onClick={() => setSelectedDoc(doc)}
                      title="Inspect ES Document _source"
                    >
                      <Eye size={13} />
                      <span>JSON</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Document JSON Preview Modal */}
      {selectedDoc && (
        <div className="modal-overlay" onClick={() => setSelectedDoc(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ff9800', fontWeight: 700 }}>
                <FileJson size={20} />
                <span>Elasticsearch Document Source ({selectedDoc.orderId})</span>
              </div>
              <button className="btn btn-outline" style={{ padding: '0.2rem 0.6rem' }} onClick={() => setSelectedDoc(null)}>
                ✕
              </button>
            </div>
            <pre className="json-box">
              {JSON.stringify(
                {
                  _index: "sales_orders",
                  _id: selectedDoc.orderId,
                  _source: selectedDoc
                },
                null,
                2
              )}
            </pre>
            <div style={{ marginTop: '1rem', textAlign: 'right' }}>
              <button className="btn btn-primary" onClick={() => setSelectedDoc(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
