import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

export default function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'customer' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const endpoint = isRegistering ? '/auth/register' : '/auth/login';

    try {
      const res = await API.post(endpoint, formData);
      login(res.data);
      if (res.data.role === 'admin' || res.data.role === 'employee') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '4rem auto' }} className="cute-card">
      <h2 style={{ color: '#6d597a', textAlign: 'center' }}>
        {isRegistering ? 'Create Account 🌸' : 'Welcome Back 💕'}
      </h2>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {isRegistering && (
          <input
            type="text"
            placeholder="Full Name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
        />

        {isRegistering && (
          <div>
            <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Role: </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              style={{ padding: '8px', borderRadius: '8px', marginLeft: '8px' }}
            >
              <option value="customer">Customer</option>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        )}

        <button type="submit" className="cute-btn" style={{ marginTop: '0.5rem' }}>
          {isRegistering ? 'Register Admin / User' : 'Login'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem' }}>
        {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
        <span
          onClick={() => setIsRegistering(!isRegistering)}
          style={{ color: '#b56576', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {isRegistering ? 'Login here' : 'Register here'}
        </span>
      </p>
    </div>
  );
}