import { useState, useEffect } from 'react';
import API from '../../services/api';

const emptyProductForm={name:'',description:'',price:'',category:'Crochet',stock:1};
export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState(emptyProductForm);
  const [images, setImages] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await API.get('/orders');
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchOrders();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (images.length > 5) {
      alert('You can upload a maximum of 5 images.');
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    for (let i = 0; i < images.length; i++) {
      data.append('images', images[i]);
    }
 try {
      await API.post('/products', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      alert('Product Added Successfully!');
      setFormData(emptyProductForm);
      setImages([]);
      e.target.reset();
    } catch (err) {
      alert('Error adding product: ' + (err.response?.data?.message || 'Unknown error'));
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      await API.patch(`/orders/${orderId}/status`, { status });
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ color: '#6d597a' }}>CraftHouse Management Center 🎨</h2>

      {/* Product Creator Form */}
      <div className="cute-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <h3>Add New Craft Product</h3>
        <form onSubmit={handleProductSubmit} style={{ display: 'grid', gap: '1rem' }}>
          <input type="text" placeholder="Product Name"  value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
          <input type="number" placeholder="Price ($)"  value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
          <select onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
            <option value="Crochet">Crochet</option>
            <option value="Paintings">Paintings</option>
            <option value="Sketches">Sketches</option>
          </select>
          <input type="file" multiple onChange={(e) => setImages(e.target.files)} required />
          <button type="submit" className="cute-btn">Upload Product</button>
        </form>
      </div>

      {/* Order List */}
      <div className="cute-card" style={{ padding: '1.5rem' }}>
        <h3>Customer Orders</h3>
        {orders.map((order) => (
          <div key={order._id} style={{ borderBottom: '1px solid #eee', padding: '0.8rem 0', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Total:</strong> ${order.totalPrice}</p>
              <p><strong>Status:</strong> {order.status}</p>
            </div>
            <div>
              <select value={order.status} onChange={(e) => updateStatus(order._id, e.target.value)}>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}