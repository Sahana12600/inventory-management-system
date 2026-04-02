import React from 'react';

export default function ProductList({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return <div className="empty-state">No products found matching your criteria.</div>;
  }

  return (
    <div className="table-responsive">
      <table className="product-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th className="text-right">Price (₹)</th>
            <th className="text-center">Stock</th>
            <th className="text-center">Min Stock</th>
            <th>Status</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => {
            const isLowStock = product.quantity <= product.minStock;
            
            return (
              <tr key={product._id} className={isLowStock ? 'row-danger' : ''}>
                <td className="font-medium">{product.name}</td>
                <td><span className="badge category-badge">{product.category}</span></td>
                <td className="text-right font-medium">₹{product.price.toLocaleString('en-IN')}</td>
                <td className="text-center">{product.quantity}</td>
                <td className="text-center text-muted">{product.minStock}</td>
                <td>
                  {isLowStock ? (
                    <span className="badge badge-danger">Low Stock</span>
                  ) : (
                    <span className="badge badge-success">Sufficient</span>
                  )}
                </td>
                <td className="actions-cell">
                  <button onClick={() => onEdit(product)} className="btn-icon text-primary" title="Edit">
                    ✎
                  </button>
                  <button onClick={() => onDelete(product._id)} className="btn-icon text-danger" title="Delete">
                    🗑
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
