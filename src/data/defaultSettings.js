// Default site settings — also used as fallback when localStorage is empty
export const defaultSettings = {
  siteName: 'DigiMantra',
  tagline: 'Building Websites That Grow Businesses.',
  phone: '+91 9310 575 998',
  phoneRaw: '919310575998',
  email: 'amansharma.aslink@gmail.com',
  instagram: 'https://instagram.com/DIGIMANTRA.AGENCY',
  whatsapp: '919310575998',
  location: 'Delhi, India',
};

/**
 * Reads site settings from localStorage (saved by admin panel),
 * falling back to defaultSettings if nothing is stored.
 */
export function getSiteSettings() {
  try {
    const saved = localStorage.getItem('dm_settings');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Derive phoneRaw from phone if not explicitly set
      if (!parsed.phoneRaw && parsed.phone) {
        parsed.phoneRaw = parsed.phone.replace(/[^0-9]/g, '');
        if (!parsed.phoneRaw.startsWith('91')) parsed.phoneRaw = '91' + parsed.phoneRaw;
      }
      return { ...defaultSettings, ...parsed };
    }
  } catch (e) {
    console.warn('Could not parse dm_settings', e);
  }
  return defaultSettings;
}
