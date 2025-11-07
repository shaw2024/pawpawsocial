import axios from 'axios';
import { config } from '../../src/shared/config/default';

const api = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
});

export default api;
