import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categoriesAPI, helpersAPI } from '../utils/api';
import HelperCard from '../components/HelperCard';
import { getCategoryIcon, HIDDEN_CATEGORIES } from '../utils/iconMap';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [featuredHelpers, setFeaturedHelpers] = useState([]);

  useEffect(() => {
    categoriesAPI.getAll()
      .then((cats) => setCategories(cats.filter(c => !HIDDEN_CATEGORIES.includes(c.name))))
      .catch(console.error);
    helpersAPI.getAll({ limit: 6, sort: 'rating_desc' })
      .then((data) => setFeaturedHelpers(data.helpers || []))
      .catch(console.error);
  }, []);

  return (
    <div className="page home-page">
      {/* Hero Section - simplified */}
      <section className="hero">
        <div className="container">
          <div className="hero-content animate-fade-in">
            <h1 className="hero-title">
              Find Trusted <span className="gradient-text">Home Helpers</span> Near You
            </h1>
            <p className="hero-subtitle">
              Connect with local helpers for cleaning, plumbing, electrical, babysitting and more.
              Book instantly and get help when you need it.
            </p>
            <div className="hero-actions">
              <Link to="/helpers" className="btn btn-primary btn-lg">Browse Helpers</Link>
              <Link to="/register" className="btn btn-secondary btn-lg">Join as Helper</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories - no Gardening/Tutoring */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Browse by <span className="gradient-text">Category</span></h2>
            <p>Find the right helper for every home task</p>
          </div>
          <div className="categories-grid stagger-children">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/helpers?category=${cat.id}`}
                className="category-card glass-card"
                id={`category-${cat.id}`}
              >
                <div className="category-icon">
                  <i className={getCategoryIcon(cat.name)}></i>
                </div>
                <h3>{cat.name}</h3>
                <p>{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Helpers */}
      {featuredHelpers.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <h2>Top Rated <span className="gradient-text">Helpers</span></h2>
              <p>Highest rated professionals in your area</p>
            </div>
            <div className="grid grid-3 stagger-children">
              {featuredHelpers.slice(0, 3).map((helper) => (
                <HelperCard key={helper.id} helper={helper} />
              ))}
            </div>
            <div className="section-footer">
              <Link to="/helpers" className="btn btn-secondary btn-lg">View All Helpers <i className="fas fa-arrow-right"></i></Link>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
