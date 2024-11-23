import fetchService from './fetchService.js';
import { GET_CATEGORY } from '../constants/endpoints.js';
import { categories } from '../mock/categories.js';

export const fetchCategory = async () => {
  try {
    // const { data } = await fetchService({
    //   url: GET_CATEGORY,
    // });
    const data = categories;

    return data;
  } catch (error) {
    console.error('Error fetching category', error);
  }
};
