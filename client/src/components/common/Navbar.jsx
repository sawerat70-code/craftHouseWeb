import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, LogOut } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1.2rem 2rem', background: '#fff', borderBottom: '1px solid #f2ece1' }}>
      <Link to="/" style={{ textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold', color: '#6d597a' }}>
        🧶 CraftHouse
      </Link>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-main)' }}>Shop</Link>
        
        {user?.role === 'admin' || user?.role === 'employee' ? (
          <Link to="/admin" style={{ textDecoration: 'none', color: '#b56576', fontWeight: '600' }}>Dashboard</Link>
        ) : null}

        <Link to="/cart" style={{ textDecoration: 'none', position: 'relative', color: 'var(--text-main)' }}>
          <ShoppingBag size={22} />
          {totalItems > 0 && (
            <span style={{ position: 'absolute', top: '-8px', right: '-10px', background: 'var(--accent-pink)', borderRadius: '50%', padding: '2px 6px', fontSize: '0.75rem', fontWeight: 'bold' }}>
              {totalItems}
            </span>
          )}
        </Link>

        {user ? (
          <button onClick={() => { logout(); navigate('/'); }} className="cute-btn" style={{ padding: '6px 12px', fontSize: '0.9rem' }}>
            <LogOut size={16} /> Logout
          </button>
        ) : (
          <Link to="/login" className="cute-btn" style={{ textDecoration: 'none', padding: '6px 14px' }}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}