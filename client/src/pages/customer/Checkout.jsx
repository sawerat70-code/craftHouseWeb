import { useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import API from '../../services/api';

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
  });


  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!cart.length) {
      alert('Your cart is empty.');
      return;
    }
const requiredFields = ['fullName', 'email', 'address', 'city', 'postalCode', 'phone'];
    const missingField = requiredFields.find((field) => !formData[field].trim());

    if (missingField) {
      alert('Please fill in all checkout details.');
      return;
    }

        try {
      const orderItems = cart.map((item) => ({
        name: item.name,
        qty: item.qty,
        image: item.images?.[0]?.url || '',
        price: item.price,
        product: item._id,
      }));

      await API.post('/orders', {
        orderItems,
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          phone: formData.phone,
        },
        totalPrice: subtotal,
      });
 alert('Order placed successfully!');
      clearCart();
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to place order. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1rem' }}>
      <h2 style={{ color: '#6d597a', marginBottom: '1.5rem' }}>Checkout</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem' }}>
        <form onSubmit={handlePlaceOrder} className="cute-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginTop: 0 }}>Shipping Details</h3>

          <div style={{ display: 'grid', gap: '1rem' }}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #ddd' }}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #ddd' }}
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
              style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #ddd' }}
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
              style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #ddd' }}
            />
 <input
              type="text"
              name="postalCode"
              placeholder="Postal / ZIP Code"
              value={formData.postalCode}
              onChange={handleChange}
              required
              style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #ddd' }}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #ddd' }}
            />
          </div>

          <button type="submit" className="cute-btn" style={{ marginTop: '1.5rem', width: '100%' }}>
            Place Order
          </button>
        </form>

        <div className="cute-card" style={{ padding: '1.5rem', height: 'fit-content' }}>
          <h3 style={{ marginTop: 0 }}>Order Summary</h3>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={item._id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                    paddingBottom: '0.8rem',
                    borderBottom: '1px solid #f0e9e4',
                    marginBottom: '0.8rem',
                  }}
                >
                  <div>
                    <strong>{item.name}</strong>
                    <div style={{ color: '#8c8275', fontSize: '0.9rem' }}>
                      Qty: {item.qty}
                    </div>
                  </div>
                  <div>${(item.price * item.qty).toFixed(2)}</div>
                </div>
              ))}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  marginTop: '1rem',
                }}
              >
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
