import { useId } from 'react';

export type ServiceIconName = 'gfx' | 'vfx' | 'turnkey' | 'branding' | 'logo';

export function ServiceIcon({ name }: { name: ServiceIconName }) {
  const uid = useId().replace(/:/g, '');
  const gradId = `svc-grad-${name}-${uid}`;

  return (
    <svg
      className="service-svg"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="4" y1="4" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f3f5ff" />
          <stop offset="55%" stopColor="#aeb7df" />
          <stop offset="100%" stopColor="#5a638f" />
        </linearGradient>
      </defs>

      {name === 'gfx' && (
        <>
          <rect
            x="5"
            y="6"
            width="26"
            height="20"
            rx="4"
            stroke={`url(#${gradId})`}
            strokeWidth="1.75"
          />
          <path
            d="M5 21.5L13 14.5L19.5 20L24.5 16L31 22"
            stroke={`url(#${gradId})`}
            strokeWidth="1.65"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="24" cy="11.5" r="2.1" fill="#eaedfc" />
          <path
            d="M11 30H25"
            stroke="#7d86b0"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </>
      )}

      {name === 'vfx' && (
        <>
          <ellipse
            cx="18"
            cy="18"
            rx="13.5"
            ry="6.5"
            transform="rotate(-30 18 18)"
            stroke={`url(#${gradId})`}
            strokeWidth="1.65"
          />
          <ellipse
            cx="18"
            cy="18"
            rx="13.5"
            ry="6.5"
            transform="rotate(30 18 18)"
            stroke="#6d76a3"
            strokeWidth="1.35"
          />
          <path
            d="M18 10.5L20 16L25.5 18L20 20L18 25.5L16 20L10.5 18L16 16L18 10.5Z"
            fill={`url(#${gradId})`}
          />
        </>
      )}

      {name === 'turnkey' && (
        <>
          <rect
            x="5"
            y="5"
            width="11"
            height="11"
            rx="3"
            stroke={`url(#${gradId})`}
            strokeWidth="1.7"
          />
          <rect
            x="20"
            y="5"
            width="11"
            height="11"
            rx="3"
            fill={`url(#${gradId})`}
            fillOpacity="0.2"
            stroke={`url(#${gradId})`}
            strokeWidth="1.7"
          />
          <rect
            x="5"
            y="20"
            width="11"
            height="11"
            rx="3"
            stroke="#6d76a3"
            strokeWidth="1.6"
          />
          <path
            d="M21 25.5L24.2 28.5L30.5 22"
            stroke="#f3f5ff"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}

      {name === 'branding' && (
        <>
          <path
            d="M18 5L30 12V24L18 31L6 24V12L18 5Z"
            stroke={`url(#${gradId})`}
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path
            d="M18 5V18M18 18L30 12M18 18L6 12M18 18V31"
            stroke="#7d86b0"
            strokeWidth="1.35"
            strokeLinecap="round"
          />
          <circle cx="18" cy="18" r="3" fill="#eaedfc" />
        </>
      )}

      {name === 'logo' && (
        <>
          <path
            d="M18 5.5L27.5 18.5L22.5 28.5H13.5L8.5 18.5L18 5.5Z"
            stroke={`url(#${gradId})`}
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path
            d="M18 5.5V16.5"
            stroke={`url(#${gradId})`}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="18" cy="18.5" r="2.4" fill="#f3f5ff" />
          <path
            d="M11 31.5H25"
            stroke="#7d86b0"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}

export default ServiceIcon;
