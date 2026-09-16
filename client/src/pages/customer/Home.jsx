import { useState, useEffect, useContext } from 'react';
import API from '../../services/api.js';
import { CartContext } from '../../context/CartContext';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = selectedCategory ? `/products?category=${selectedCategory}` : '/products';
        const res = await API.get(url);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ color: '#6d597a', fontSize: '2.5rem' }}>Handmade with Love ✨</h1>
        <p style={{ color: 'var(--text-muted)' }}>Explore cozy crochet items, custom sketches, and fine art.</p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', marginTop: '1rem' }}>
          {['', 'Crochet', 'Paintings', 'Sketches'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="cute-btn"
              style={{
                background: selectedCategory === cat ? 'var(--accent-pink)' : '#f3efe6',
              }}
            >
              {cat || 'All Items'}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
        {products.map((product) => (
          <div key={product._id} className="cute-card" style={{ padding: '1rem', textAlign: 'center' }}>
            <img
            src={product.images?.[0]?.url || 'https://via.placeholder.com/200'}
              alt={product.name}
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px' }}
            />
            <h3 style={{ margin: '0.8rem 0 0.3rem', color: 'var(--text-main)' }}>{product.name}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)} className="cute-btn" style={{ width: '100%', marginTop: '0.5rem' }}>
              Add to Cart 🛒
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}