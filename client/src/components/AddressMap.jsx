const DEFAULT_MAP_ADDRESS = 'Dhaka, Bangladesh';

function buildMapUrl(address) {
  const query = encodeURIComponent(address?.trim() || DEFAULT_MAP_ADDRESS);
  return `https://www.google.com/maps?q=${query}&output=embed`;
}

export function addressPlaceholder() {
  return 'House 12, Road 8, Block C, Banani, Dhaka';
}

export default function AddressMap({ address, label = 'Address preview' }) {
  if (!address?.trim()) return null;

  return (
    <div className="address-preview">
      <div className="address-preview-header">
        <span><i className="fas fa-location-dot"></i> {label}</span>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
          target="_blank"
          rel="noreferrer"
        >
          Open map
        </a>
      </div>
      <p>{address}</p>
      <iframe
        title={`Map for ${address}`}
        src={buildMapUrl(address)}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
