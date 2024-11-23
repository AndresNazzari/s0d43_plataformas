import fetchService from './fetchService.js';
import { GET_PRODUCT } from '../constants/endpoints.js';
import pokemons from '../mock/products.js';

export const fetchProducts = async (category) => {
  try {
    // const { data } = await fetchService({
    //   url: GET_ALL_PRODUCTS,
    // });
    const data = pokemons;
    if (category) {
      return data.filter((product) => product.category === category);
    }

    return data;
  } catch (error) {
    console.error('Error fetching products', error);
  }
};

export const fetchProduct = async (id) => {
  try {
    // const { data } = await fetchService({
    //   url: GET_ALL_PRODUCTS + '/' + id,
    // });
    const data = pokemons;

    return data.find((product) => product.id === parseInt(id));
  } catch (error) {
    console.error('Error fetching products', error);
  }
};
