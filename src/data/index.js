const THUMB_A = 'https://dummyimage.com/120x160/ffffff/222222&text=Table';
const THUMB_B = 'https://dummyimage.com/120x160/f4f4f4/222222&text=Doc';

export const DOCS = [
  { id: '1', title: 'CamScanner 25-10-2026 15.48', date: '25/10/2026 15:48', pages: 2, thumb: THUMB_A },
  { id: '2', title: 'CamScanner 05-07-2026 17.13', date: '05/07/2026 17:13', pages: 1, thumb: THUMB_B },
];

export const HOME_SHORTCUTS = [
  { label: 'Smart Scan', icon: 'text-box-search-outline', color: '#16D3A5' },
  { label: 'PDF Tools', icon: 'file-pdf-box', color: '#F2503F' },
  { label: 'Import Images', icon: 'image-move', color: '#2F7BFF' },
  { label: 'Import Files', icon: 'file-import', color: '#2F6BFF' },
  { label: 'ID Cards', icon: 'card-account-details-outline', color: '#16D3A5' },
  { label: 'Extract Text', icon: 'format-text', color: '#16D3A5', box: true },
  { label: 'ID Photo\nMaker', icon: 'account-box', color: '#2F6BFF' },
  { label: 'All', icon: 'view-dashboard', color: '#16D3A5' },
];

export const DOC_TILES = [
  { label: 'Import Files', icon: 'file-import', color: '#3B6BFF' },
  { label: 'Import Images', icon: 'image-multiple', color: '#4C9BFF' },
  { label: 'Create Folder', icon: 'folder-plus', color: '#16D3A5' },
];

export const TOOL_SECTIONS = [
  {
    title: 'Scan',
    items: [
      { label: 'ID Cards', icon: 'card-account-details-outline', color: '#16D3A5', tint: '#0B2A26' },
      { label: 'Extract Text', icon: 'format-text', color: '#16D3A5', tint: '#0B2A26', box: true },
      { label: 'ID Photo\nMaker', icon: 'account-box', color: '#2F6BFF', tint: '#0F1A3A' },
      { label: 'Formula', icon: 'sigma', color: '#16D3A5', tint: '#0B2A26', box: true },
      { label: 'photo\ntranslation', icon: 'translate', color: '#4B63D9', tint: '#131735' },
      { label: 'Book', icon: 'book-open-page-variant', color: '#1FA4C4', tint: '#0A2530' },
      { label: 'PPT', icon: 'presentation-play', color: '#F2503F', tint: '#2A1410', box: true },
      { label: 'Whiteboard', icon: 'presentation', color: '#16B7C4', tint: '#0A2A2C' },
      { label: 'Timestamp', icon: 'clock-time-four', color: '#2F6BFF', tint: '#0F1A3A', box: true },
      { label: 'Mega Scan', icon: 'scan-helper', color: '#16D3A5', tint: '#0B2A26', badge: 'New' },
    ],
  },
  {
    title: 'Import',
    items: [
      { label: 'Import Images', icon: 'image-multiple', color: '#16D3A5', tint: '#0B2A26' },
      { label: 'Import Files', icon: 'file-import', color: '#2F6BFF', tint: '#0F1A3A' },
    ],
  },
  {
    title: 'Convert',
    items: [
      { label: 'To Word', icon: 'file-word-box', color: '#2F6BFF', tint: '#0F1A3A' },
      { label: 'To Excel', icon: 'file-excel-box', color: '#22C55E', tint: '#0C2616' },
      { label: 'To PPT', icon: 'file-powerpoint-box', color: '#F2503F', tint: '#2A1410' },
      { label: 'PDF to Images', icon: 'image-multiple-outline', color: '#16D3A5', tint: '#0B2A26' },
      { label: 'Image to PDF', icon: 'image', color: '#2F7BFF', tint: '#0F1A3A' },
    ],
  },
];

export const SEARCH_HINTS = [
  'Search for text in images, like "contract"',
  'Search for tools, like "ID Card"',
  'Search for tools, like "To Text"',
  'Search for text in images, like "company"',
];

export const TABS = [
  { key: 'home', label: 'Home', icon: 'home' },
  { key: 'docs', label: 'All Documents', icon: 'text-box-outline' },
  { key: 'tools', label: 'Tools', icon: 'view-grid' },
  { key: 'me', label: 'Me', icon: 'account', dot: true },
];
