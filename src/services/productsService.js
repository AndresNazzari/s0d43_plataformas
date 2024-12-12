import fetchService from "./fetchService.js";
import { PRODUCT } from "../constants/endpoints.js";

export const getAllProducts = async (category) => {
  try {
    const res = await fetchService({
      url: PRODUCT,
    });

    if (res.status === 200) {
      if (category) {
        return res.data?.filter((product) => product.category === category);
      }
      return res.data;
    }
  } catch (error) {
    console.error('Error fetching products', error);
  }
};

export const getProductById = async (id) => {
  try {
    const res = await fetchService({
      url: `${PRODUCT}/${id}`,
    });

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error('Error fetching products', error);
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await fetchService({
      method: 'delete',
      url: `${PRODUCT}/${id}`,
    });

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error('Error fetching products', error);
  }
};

export const createProduct = async (product) => {
  try {
    const res = await fetchService({
      method: 'post',
      url: `${PRODUCT}`,
      data: product,
    });

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error('Error fetching products', error);
  }
};

export const updateProduct = async (product) => {
  try {
    const res = await fetchService({
      method: 'put',
      url: `${PRODUCT}/${product.id}`,
      data: product,
    });

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error('Error fetching products', error);
  }
};
