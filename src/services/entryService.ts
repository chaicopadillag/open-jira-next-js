import axios from 'axios';

// config axios
const entryService = axios.create({
  baseURL: '/api',
});

export default entryService;
