import fetchService from './fetchService.js';
import { GET_USER } from '../constants/endpoints.js';
import { users } from '../mock/users';

export const fetchUsers = async (category) => {
  try {
    // const { data } = await fetchService({
    //   url: GET_USER,
    // });
    return users;
  } catch (error) {
    console.error('Error fetching products', error);
  }
};

export const fetchUser = async (id) => {
  try {
    // const { data } = await fetchService({
    //   url: GET_ALL_PRODUCTS + '/' + id,
    // });
    const data = users;

    return data.find((product) => product.id === parseInt(id));
  } catch (error) {
    console.error('Error fetching products', error);
  }
};
