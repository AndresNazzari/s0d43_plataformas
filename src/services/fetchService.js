import axios from 'axios';
import { BASE_URL } from '../constants/endpoints';

const axiosApi = axios.create({
  baseURL: BASE_URL,
});

const fetchService = async ({
  method = 'get',
  url = '/',
  data = {},
  params = {},
  headers = {},
}) => {
  const options = {
    method,
    url,
    data,
    params,
    headers,
  };

  const authToken = localStorage.getItem('token');

  authToken && (options.headers = { Authorization: `Bearer ${authToken}` });

  return await axiosApi(options);
};

export default fetchService;
