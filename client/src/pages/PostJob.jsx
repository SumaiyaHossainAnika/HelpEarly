import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobsAPI, categoriesAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { HIDDEN_CATEGORIES } from '../utils/iconMap';
import AddressMap, { addressPlaceholder } from '../components/AddressMap';

export default function PostJob() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    category_id: '', title: '', description: '', budget: '',
    location: user?.location || '', preferred_date: '',
  });

  useEffect(() => {
    categoriesAPI.getAll()
      .then(cats => setCategories(cats.filter(c => !HIDDEN_CATEGORIES.includes(c.name))))
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await jobsAPI.create(form);
      navigate('/dashboard');
    } catch (err) { alert(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: 640 }}>
        <div className="glass-card-static animate-fade-in">
          <div className="page-header" style={{ marginBottom: 24 }}>
            <h1><i className="fas fa-bullhorn"></i> Post a Job</h1>
            <p>Describe what you need and helpers will apply</p>
          </div>

          <form onSubmit={handleSubmit} id="post-job-form">
            <div className="form-group">
              <label>Job Title</label>
              <input type="text" className="form-input" placeholder="e.g., Need deep cleaning for 3-bedroom apartment"
                value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select className="form-input" value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })} required>
                <option value="">Select a category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea className="form-input" placeholder="Describe the job in detail. Include any specific requirements..."
                value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Budget (৳)</label>
                <input type="number" className="form-input" placeholder="e.g., 2000"
                  value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Preferred Date</label>
                <input type="date" className="form-input"
                  value={form.preferred_date} onChange={(e) => setForm({ ...form, preferred_date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]} />
              </div>
            </div>
            <div className="form-group">
              <label>Job Address</label>
              <input type="text" className="form-input" placeholder={addressPlaceholder()}
                value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
              <small className="field-help">Use a real address format so helpers can see the area on the map.</small>
            </div>
            <AddressMap address={form.location} label="Job map preview" />
            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Posting...' : 'Post Job'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
