// Default site settings — also used as fallback when localStorage is empty
export const defaultSettings = {
  siteName: 'DigiMantra',
  tagline: 'Building Websites That Grow Businesses.',
  phone: '+91 9999 999 999',
  phoneRaw: '919999999999',
  email: 'hello@digimantra.in',
  instagram: 'https://instagram.com/digimantra.in',
  whatsapp: '919999999999',
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
