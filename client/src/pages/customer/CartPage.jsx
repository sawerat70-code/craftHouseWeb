import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ color: '#6d597a' }}>Your Shopping Basket 🌸</h2>
      {cart.length === 0 ? (
        <p>Your basket is currently empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item._id} className="cute-card" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', marginBottom: '1rem', alignItems: 'center' }}>
              <div>
                <h4>{item.name}</h4>
                <p>${item.price} x {item.qty}</p>
              </div>
              <button onClick={() => removeFromCart(item._id)} style={{ background: '#f8d7da', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer' }}>
                Remove
              </button>
            </div>
          ))}
          <h3>Total: ${total.toFixed(2)}</h3>
          <button onClick={() => navigate('/checkout')} className="cute-btn" style={{ width: '100%', marginTop: '1rem' }}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}