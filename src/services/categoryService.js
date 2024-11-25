import fetchService from './fetchService.js';
import { GET_CATEGORY } from '../constants/endpoints.js';
import { categories } from '../mock/categories.js';

export const fetchCategory = async () => {
  try {
    const data = categories;

    return data;
  } catch (error) {
    console.error('Error fetching category', error);
  }
};
