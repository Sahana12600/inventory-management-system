import React, { useState, useEffect } from 'react';

export default function ProductForm({ onSubmit, editingProduct, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    minStock: ''
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        category: editingProduct.category,
        price: editingProduct.price,
        quantity: editingProduct.quantity,
        minStock: editingProduct.minStock
      });
      setFormErrors({});
    } else {
      setFormData({ name: '', category: '', price: '', quantity: '', minStock: '' });
      setFormErrors({});
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear errors inline when typing
    if (formErrors[name]) setFormErrors({ ...formErrors, [name]: null });
  };

  const validate = () => {
    let errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.category.trim()) errors.category = 'Category is required';
    if (Number(formData.price) <= 0) errors.price = 'Price must be > 0';
    if (Number(formData.quantity) < 0) errors.quantity = 'Quantity cannot be negative';
    if (Number(formData.minStock) < 0) errors.minStock = 'Min stock cannot be negative';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    onSubmit({
      ...formData,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      minStock: Number(formData.minStock)
    });

    if (!editingProduct) {
      setFormData({ name: '', category: '', price: '', quantity: '', minStock: '' });
    }
  };

  return (
    <div className="card form-card">
      <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label>Name <span className="required">*</span></label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          {formErrors.name && <span className="error-text">{formErrors.name}</span>}
        </div>
        <div className="form-group">
          <label>Category <span className="required">*</span></label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="">Select a Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Stationery">Stationery</option>
            <option value="Accessories">Accessories</option>
            <option value="Clothing">Clothing</option>
            <option value="Groceries">Groceries</option>
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Dairy & Beverages">Dairy & Beverages</option>
            <option value="Home Appliances">Home Appliances</option>
            <option value="Health & Beauty">Health & Beauty</option>
            <option value="Sports & Outdoors">Sports & Outdoors</option>
            <option value="Toys & Games">Toys & Games</option>
            <option value="Other">Other</option>
          </select>
          {formErrors.category && <span className="error-text">{formErrors.category}</span>}
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Price (₹) <span className="required">*</span></label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} min="0.01" step="0.01" />
            {formErrors.price && <span className="error-text">{formErrors.price}</span>}
          </div>
          <div className="form-group">
            <label>Quantity <span className="required">*</span></label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} min="0" />
            {formErrors.quantity && <span className="error-text">{formErrors.quantity}</span>}
          </div>
          <div className="form-group">
            <label>Min Stock <span className="required">*</span></label>
            <input type="number" name="minStock" value={formData.minStock} onChange={handleChange} min="0" />
            {formErrors.minStock && <span className="error-text">{formErrors.minStock}</span>}
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingProduct ? 'Save Changes' : 'Add Product'}
          </button>
          {editingProduct && (
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
