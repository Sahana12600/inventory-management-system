import React, { useState, useEffect } from 'react';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from './api';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import Dashboard from './components/Dashboard';

export default function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetchProducts();
      setProducts(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch products. Ensures the backend server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleAddOrUpdate = async (productData) => {
    setIsLoading(true);
    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, productData);
        showSuccess('Product updated successfully!');
      } else {
        await addProduct(productData);
        showSuccess('Product added successfully!');
      }
      setEditingProduct(null);
      await loadProducts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product.');
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      await deleteProduct(id);
      showSuccess('Product deleted successfully!');
      await loadProducts();
    } catch (err) {
      setError('Failed to delete product.');
      setIsLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = [...new Set(products.map(p => p.category))];
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter ? p.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    const aIsLow = a.quantity <= a.minStock;
    const bIsLow = b.quantity <= b.minStock;
    if (aIsLow && !bIsLow) return -1;
    if (!aIsLow && bIsLow) return 1;
    return 0;
  });

  return (
    <div className="app-container">
      <header className="navbar">
        <div className="container nav-content">
          <h1>📦 InventoryMaster</h1>
          <p className="subtitle">Manage stock beautifully.</p>
        </div>
      </header>

      <main className="container main-content">
        {error && <div className="alert alert-danger">{error}</div>}
        {successMsg && <div className="alert alert-success">{successMsg}</div>}

        <Dashboard products={products} />

        <div className="content-grid">
          <aside className="sidebar">
            <ProductForm 
              onSubmit={handleAddOrUpdate} 
              editingProduct={editingProduct} 
              onCancel={() => setEditingProduct(null)} 
            />
          </aside>

          <section className="data-section">
            <div className="controls card">
              <input 
                type="text" 
                placeholder="🔍 Search by product name..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field search-input"
              />
              <select 
                value={categoryFilter} 
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="input-field category-select"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="card table-container">
              {isLoading ? (
                <div className="loading-state">
                  <div className="spinner"></div>
                  <p>Loading inventory data...</p>
                </div>
              ) : (
                <ProductList 
                  products={filteredProducts} 
                  onEdit={handleEdit} 
                  onDelete={handleDelete} 
                />
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
