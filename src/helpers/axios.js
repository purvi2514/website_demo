import axios from 'axios';
import { getSession } from './dataLake';
const instance = axios.create();
instance.interceptors.request.use(cfg => {
  const s = getSession();
  if (s && s.token) cfg.headers['Authorization'] = `Bearer ${s.token}`;
  return cfg;
});
export default instance;
