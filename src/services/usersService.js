import fetchService from './fetchService.js';
import {LOGIN, REGISTER, USERS} from "../constants/endpoints.js";

export const getUsers = async () => {
  try {
    const res = await fetchService({
      url: USERS,
    });

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error('Error fetching products', error);
  }
};

export const loginUser = async (userData) => {
  try {
    const res = await fetchService({
      method: 'post',
      url: LOGIN,
      data: userData,
    });

    if (res.status === 200) {
      localStorage.setItem('token', res.data.token);
      return res.data.user;
    }
  } catch (error) {
    console.error('Error fetching products', error);
  }
};

export const createUser = async (userData) => {
  const newUser = { ...userData, roleId: userData.roleId || 2 };
  try {
    const res = await fetchService({
      method: 'post',
      url: REGISTER,
      data: newUser,
    });

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error('Error fetching products', error);
  }
};

export const updateUser = async (userData) => {
  try {
    const res = await fetchService({
      method: 'put',
      url: `${REGISTER}/${userData.email}`,
      data: userData,
    });

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error('Error fetching products', error);
  }
};

export const deleteUser = async (email) => {
  try {
    const res = await fetchService({
      method: 'delete',
      url: `${REGISTER}/${email}`,
    });

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error('Error fetching products', error);
  }
};
