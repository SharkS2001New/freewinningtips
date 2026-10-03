import axios from 'axios';
import nookies from 'nookies';

export const SITE = 'freetips';

const api = axios.create({
  baseURL: 'https://api.pitchpredictions.com/api',
});

// Attach token + site so login/register/payments resolve the correct customer pool.
api.interceptors.request.use((config) => {
  const cookies = nookies.get();
  if (cookies.token) {
    config.headers.Authorization = `Bearer ${cookies.token}`;
  }
  config.headers['X-Site-Key'] = SITE;

  const method = String(config.method || 'get').toLowerCase();
  if (['post', 'put', 'patch'].includes(method) && config.data && typeof config.data === 'object' && !(config.data instanceof FormData) && !Array.isArray(config.data)) {
    if (!config.data.site) {
      config.data = { ...config.data, site: SITE };
    }
  }

  if (method === 'get') {
    config.params = { ...(config.params || {}), site: SITE };
  }

  return config;
});

export default api;
