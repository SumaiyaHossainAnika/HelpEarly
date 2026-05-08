import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <span className="brand-icon"><i className="fas fa-home" style={{ color: 'var(--accent)' }}></i></span>
            <span className="brand-text">At Your Service</span>
            <p className="footer-desc">Connecting households with trusted local helpers for all your home service needs.</p>
          </div>
          <div className="footer-links-group">
            <h4>Platform</h4>
            <Link to="/helpers">Find Helpers</Link>
            <Link to="/jobs">Job Board</Link>
            <Link to="/register">Become a Helper</Link>
          </div>
          <div className="footer-links-group">
            <h4>Categories</h4>
            <Link to="/helpers?category=1"><i className="fas fa-broom"></i> Cleaning</Link>
            <Link to="/helpers?category=2"><i className="fas fa-wrench"></i> Plumbing</Link>
            <Link to="/helpers?category=3"><i className="fas fa-bolt"></i> Electrical</Link>
            <Link to="/helpers?category=5"><i className="fas fa-baby"></i> Babysitting</Link>
          </div>
          <div className="footer-links-group">
            <h4>Support</h4>
            <a href="#">Help Center</a>
            <a href="#">Safety</a>
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} At Your Service. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
