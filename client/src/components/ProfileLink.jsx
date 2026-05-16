import { Link } from 'react-router-dom';

export default function ProfileLink({
  userId,
  helperId,
  role,
  name,
  className = 'profile-link',
  children,
  onClick,
}) {
  const label = children || name || 'Profile';
  const isUnavailable = !label || label === 'Unavailable';

  if (isUnavailable) {
    return <span className={className}>{label || 'Unavailable'}</span>;
  }

  const path = role === 'helper' && helperId
    ? `/helpers/${helperId}`
    : userId
      ? `/users/${userId}`
      : helperId
        ? `/helpers/${helperId}`
        : null;

  if (!path) {
    return <span className={className}>{label}</span>;
  }

  return (
    <Link to={path} className={className} onClick={onClick}>
      {label}
    </Link>
  );
}
