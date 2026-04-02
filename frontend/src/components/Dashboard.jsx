import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Dashboard({ products }) {
  const totalProducts = products.length;
  const lowStockCount = products.filter(p => p.quantity <= p.minStock).length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);

  // Group data for Pie Chart
  const categoryData = products.reduce((acc, product) => {
    const existing = acc.find(item => item.name === product.category);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: product.category, value: 1 });
    }
    return acc;
  }, []);

  const COLORS = ['#4338ca', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#3b82f6'];

  return (
    <>
      <div className="dashboard">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p className="stat-number">{totalProducts}</p>
        </div>
        <div className="stat-card">
          <h3>Low Stock Items</h3>
          <p className="stat-number text-danger">{lowStockCount}</p>
        </div>
        <div className="stat-card">
          <h3>Total Inventory Value</h3>
          <p className="stat-number">₹{totalValue.toLocaleString('en-IN')}</p>
        </div>
      </div>
      
      <div className="card dashboard-charts" style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '0.05em', width: '100%', textAlign: 'left' }}>
          Products by Category
        </h3>
        {categoryData.length > 0 ? (
          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  innerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, 'Items']} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-muted" style={{ padding: '2rem 0' }}>No category data available yet.</p>
        )}
      </div>
    </>
  );
}
