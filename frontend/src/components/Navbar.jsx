import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        Job<span>Portal</span>
      </Link>
      <nav className="nav-links">
        <Link to="/">Browse jobs</Link>
        {isAuthenticated && user?.role === 'RECRUITER' && (
          <Link to="/post-job">Post a job</Link>
        )}
        {isAuthenticated && user?.role === 'JOB_SEEKER' && (
          <Link to="/my-applications">My applications</Link>
        )}
        {isAuthenticated ? (
          <>
            <span className="pill">{user?.name} · {user?.role === 'RECRUITER' ? 'Recruiter' : 'Job seeker'}</span>
            <button className="btn-ghost" onClick={handleLogout}>Log out</button>
          </>
        ) : (
          <>
            <Link to="/login">Log in</Link>
            <Link to="/register" className="btn-primary-link">Sign up</Link>
          </>
        )}
      </nav>
    </header>
  );
}
