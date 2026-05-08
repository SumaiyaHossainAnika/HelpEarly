import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { helpersAPI, bookingsAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import AddressMap, { addressPlaceholder } from '../components/AddressMap';

export default function Booking() {
  const { helperId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [helper, setHelper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const selectedServiceId = searchParams.get('service');

  const [form, setForm] = useState({
    service_id: selectedServiceId || '',
    booking_date: '',
    booking_time: '10:00',
    notes: '',
    address: user?.location || '',
  });

  useEffect(() => {
    helpersAPI.getOne(helperId)
      .then((data) => {
        setHelper(data);
        if (selectedServiceId) setForm(prev => ({ ...prev, service_id: selectedServiceId }));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [helperId]);

  const selectedService = helper?.services?.find(s => String(s.id) === String(form.service_id));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await bookingsAPI.create({
        helper_id: parseInt(helperId),
        service_id: form.service_id ? parseInt(form.service_id) : null,
        booking_date: `${form.booking_date}T${form.booking_time}:00`,
        notes: form.notes,
        total_price: selectedService?.price || helper?.hourly_rate || 0,
        address: form.address,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!helper) return <div className="page"><div className="container"><div className="empty-state"><h3>Helper not found</h3></div></div></div>;

  if (success) {
    return (
      <div className="page">
        <div className="container">
          <div className="success-card glass-card-static animate-scale-in" style={{ maxWidth: 500, margin: '80px auto', textAlign: 'center' }}>
            <span style={{ fontSize: '4rem', display: 'block', marginBottom: 16, color: 'var(--success)' }}><i className="fas fa-check-circle"></i></span>
            <h2>Booking Submitted!</h2>
            <p style={{ color: 'var(--text-secondary)', margin: '12px 0 24px' }}>
              Your booking request has been sent to {helper.name}. You'll be notified when they confirm.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>My Bookings</button>
              <button className="btn btn-secondary" onClick={() => navigate('/helpers')}>Browse More</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <div className="booking-layout animate-fade-in">
          {/* Booking Form */}
          <div className="booking-form-card glass-card-static">
            <h1><i className="fas fa-calendar-plus"></i> Book a Service</h1>
            <p className="text-secondary">Fill in the details to book {helper.name}</p>

            {error && <div className="alert alert-error">{error}</div>}

            <form onSubmit={handleSubmit} id="booking-form">
              <div className="form-group">
                <label htmlFor="booking-service">Service</label>
                <select id="booking-service" className="form-input" value={form.service_id} onChange={(e) => setForm({ ...form, service_id: e.target.value })}>
                  <option value="">-- Select a service --</option>
                  {(helper.services || []).map((s) => (
                    <option key={s.id} value={s.id}>{s.service_name} - ৳{s.price}</option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="booking-date">Date</label>
                  <input type="date" id="booking-date" className="form-input" value={form.booking_date}
                    onChange={(e) => setForm({ ...form, booking_date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]} required />
                </div>
                <div className="form-group">
                  <label htmlFor="booking-time">Time</label>
                  <input type="time" id="booking-time" className="form-input" value={form.booking_time}
                    onChange={(e) => setForm({ ...form, booking_time: e.target.value })} required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="booking-address">Full Service Address</label>
                <input type="text" id="booking-address" className="form-input" placeholder={addressPlaceholder()}
                  value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required />
                <small className="field-help">Include house/flat number, road, block, area, and city.</small>
              </div>

              <AddressMap address={form.address} />

              <div className="form-group">
                <label htmlFor="booking-notes">Notes (Optional)</label>
                <textarea id="booking-notes" className="form-input" placeholder="Any special instructions..."
                  value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} />
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={submitting} id="booking-submit">
                {submitting ? 'Submitting...' : 'Confirm Booking'}
              </button>
            </form>
          </div>

          {/* Summary Sidebar */}
          <div className="booking-summary glass-card-static">
            <h3>Booking Summary</h3>
            <div className="summary-helper">
              <div className="avatar avatar-lg avatar-placeholder">{helper.name?.charAt(0)}</div>
              <div>
                <p className="summary-name">{helper.name}</p>
                <p className="text-secondary"><i className="fas fa-map-marker-alt"></i> {helper.location}</p>
              </div>
            </div>
            <div className="summary-details">
              {selectedService && (
                <div className="summary-row">
                  <span>Service</span>
                  <span>{selectedService.service_name}</span>
                </div>
              )}
              <div className="summary-row">
                <span>Date</span>
                <span>{form.booking_date || 'Not selected'}</span>
              </div>
              <div className="summary-row">
                <span>Time</span>
                <span>{form.booking_time}</span>
              </div>
              <div className="summary-divider"></div>
              {form.address && (
                <div className="summary-row" style={{ display: 'block' }}>
                  <span>Address</span>
                  <p style={{ color: 'var(--text-primary)', marginTop: 4 }}>{form.address}</p>
                </div>
              )}
              <div className="summary-row total">
                <span>Total</span>
                <span>৳{selectedService?.price || helper.hourly_rate || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
