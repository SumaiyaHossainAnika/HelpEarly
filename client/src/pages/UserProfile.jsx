import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { usersAPI } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import AddressMap from '../components/AddressMap';
import StarRating from '../components/StarRating';

export default function UserProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    usersAPI.getOne(id)
      .then(setProfile)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (error || !profile) {
    return (
      <div className="page">
        <div className="container">
          <div className="empty-state">
            <i className="fas fa-user-slash"></i>
            <h3>{error || 'Profile unavailable'}</h3>
            <p>This account may be inactive or removed.</p>
          </div>
        </div>
      </div>
    );
  }

  const initial = profile.name?.charAt(0).toUpperCase() || '?';

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: 900 }}>
        <div className="helper-profile-header glass-card-static animate-fade-in">
          <div className="profile-main">
            <div className="profile-avatar-section">
              {profile.avatar_url ? (
                <img src={profile.avatar_url} alt={profile.name} className="avatar avatar-xl" />
              ) : (
                <div className="avatar avatar-xl avatar-placeholder">{initial}</div>
              )}
            </div>
            <div className="profile-info-section">
              <h1>{profile.name}</h1>
              <p className="profile-location">
                <i className="fas fa-map-marker-alt"></i> {profile.location || 'Location not set'}
              </p>
              <div className="profile-meta">
                <span className={`badge ${profile.role === 'helper' ? 'badge-primary' : profile.role === 'admin' ? 'badge-danger' : 'badge-info'}`}>
                  {profile.role}
                </span>
                <span className="meta-item">
                  <i className="fas fa-calendar"></i> Joined {new Date(profile.created_at).toLocaleDateString()}
                </span>
              </div>
              {profile.role === 'helper' && (
                <div className="profile-meta" style={{ marginTop: 10 }}>
                  <StarRating rating={profile.avg_rating || 0} />
                  <span className="rating-value">{Number(profile.avg_rating || 0).toFixed(1)}</span>
                  <span className="review-count">({profile.total_reviews || 0} reviews)</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-2">
          <div className="glass-card-static">
            <h3 style={{ marginBottom: 12 }}><i className="fas fa-id-card"></i> Profile Details</h3>
            {profile.role === 'helper' ? (
              <>
                <p style={{ marginBottom: 16 }}>{profile.bio || 'No helper bio added yet.'}</p>
                <div className="booking-item-details">
                  <span><i className="fas fa-money-bill-wave"></i> ৳{profile.hourly_rate || 0}/hr</span>
                  <span><i className="fas fa-briefcase"></i> {profile.experience_years || 0} years experience</span>
                  <span><i className="fas fa-circle" style={{ fontSize: '0.5rem', color: profile.is_available ? 'var(--success)' : 'var(--danger)' }}></i> {profile.is_available ? 'Available' : 'Unavailable'}</span>
                  <span>{profile.is_verified ? <><i className="fas fa-check-circle"></i> Verified</> : <><i className="fas fa-clock"></i> Not verified</>}</span>
                </div>
                {profile.helper_profile_id && (
                  <Link to={`/helpers/${profile.helper_profile_id}`} className="btn btn-primary btn-sm" style={{ marginTop: 16 }}>
                    View Full Helper Profile
                  </Link>
                )}
              </>
            ) : (
              <p className="text-secondary">
                This is a {profile.role === 'admin' ? 'platform administrator' : 'household member'} account.
              </p>
            )}
          </div>
          <AddressMap address={profile.location} label={`${profile.name} location map`} />
        </div>
      </div>
    </div>
  );
}
