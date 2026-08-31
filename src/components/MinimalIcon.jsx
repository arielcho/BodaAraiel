const paths = {
  heart: (
    <path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.45A4 4 0 0 1 19 10c0 5.65-7 10-7 10Z" />
  ),
  book: (
    <>
      <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H20v17H8.5A3.5 3.5 0 0 0 5 22V5.5Z" />
      <path d="M5 5.5A3.5 3.5 0 0 0 1.5 2H1v17h.5A3.5 3.5 0 0 1 5 22" />
    </>
  ),
  rings: (
    <>
      <circle cx="9" cy="14" r="5" />
      <circle cx="15" cy="14" r="5" />
      <path d="M9 7.5 12 3l3 4.5" />
    </>
  ),
  camera: (
    <>
      <path d="M4 7h3l1.5-2h7L17 7h3v12H4V7Z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
  glass: (
    <>
      <path d="M7 3h10l-1 8a4 4 0 0 1-8 0L7 3Z" />
      <path d="M12 15v6" />
      <path d="M8.5 21h7" />
    </>
  ),
  dinner: (
    <>
      <path d="M7 3v18" />
      <path d="M4.5 3v5a2.5 2.5 0 0 0 5 0V3" />
      <path d="M15 3v18" />
      <path d="M15 3c3 2 4.5 5 3.5 8H15" />
    </>
  ),
  music: (
    <>
      <path d="M9 18V5l10-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="16" cy="16" r="3" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M7 3v4" />
      <path d="M17 3v4" />
      <path d="M3 10h18" />
      <path d="M8 15h8" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  dress: (
    <>
      <path d="M9 3h6l-2 5 5 13H6l5-13-2-5Z" />
      <path d="M9 3c1 2 5 2 6 0" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 2l1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2Z" />
      <path d="M19 15l.7 2.3L22 18l-2.3.7L19 22l-.7-3.3L16 18l2.3-.7L19 15Z" />
    </>
  ),
  location: (
    <>
      <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  arrow: <path d="M8 5l8 7-8 7V5Z" />,
};

const MinimalIcon = ({ name = 'heart', className = 'w-5 h-5', strokeWidth = 1.8 }) => (
  <svg
    aria-hidden="true"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {paths[name] || paths.heart}
  </svg>
);

export default MinimalIcon;
