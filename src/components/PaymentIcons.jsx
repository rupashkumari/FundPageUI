import React from 'react';

// Authentic UPI logo with the classic dual slanted triangles
export function UpiLogo({ className = "upi-icon" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '32px', height: '16px' }}
    >
      {/* Front slanted triangle (cyan/teal/green) */}
      <path
        d="M20 2L10 22H18L28 2H20Z"
        fill="#009688"
      />
      {/* Back slanted triangle (blue/deep blue) */}
      <path
        d="M30 2L20 22H28L38 2H30Z"
        fill="#097969"
        opacity="0.3"
      />
      <path
        d="M13 2L3 22H11L21 2H13Z"
        fill="#1E88E5"
      />
    </svg>
  );
}

// Net Banking Globe Icon
export function NetBankingLogo({ className = "mode-icon" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2563eb"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: '20px', height: '20px' }}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

// IMPS / NEFT / RTGS Bank Pillars Icon
export function BankLogo({ className = "mode-icon" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2563eb"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: '20px', height: '20px' }}
    >
      <path d="m3 9 9-7 9 7v2H3V9z" />
      <path d="M4 11h16" />
      <path d="M6 11v7" />
      <path d="M10 11v7" />
      <path d="M14 11v7" />
      <path d="M18 11v7" />
      <path d="M3 18h18v3H3v-3z" />
    </svg>
  );
}

// UPI Secured Lock Icon
export function ShieldLockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#eab308"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: '13px', height: '13px', display: 'inline-block', verticalAlign: 'middle' }}
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" fill="#fef08a" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
