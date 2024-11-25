import fetchService from './fetchService.js';

export const getUsers = async () => {
  try {
    const dataStr = localStorage.getItem('users');
    return JSON.parse(dataStr);
  } catch (error) {
    console.error('Error fetching products', error);
  }
};

export const loginUser = async (userData) => {
  try {
    const usersStr = localStorage.getItem('users');
    const users = JSON.parse(usersStr);
    const user = users.find(
      (user) =>
        user.email === userData.email && user.password === userData.password
    );
    console.log('user', user);
    return user;
  } catch (error) {
    console.error('Error fetching products', error);
  }
};

export const createUser = async (userData) => {
  const usersStr = localStorage.getItem('users');
  const users = JSON.parse(usersStr);
  const newUser = { ...userData, id: users.length + 1 };
  const data = [...users, newUser];
  localStorage.setItem('users', JSON.stringify(data));

  return data;
};

export const updateUser = async (userData) => {
  const usersStr = localStorage.getItem('users');
  const users = JSON.parse(usersStr);
  const data = users.map((item) => (item.id === userData.id ? userData : item));

  localStorage.setItem('users', JSON.stringify(data));

  return data;
};

export const deleteUser = async (id) => {
  const usersStr = localStorage.getItem('users');
  const users = JSON.parse(usersStr);
  const data = users.filter((user) => user.id !== parseInt(id));

  localStorage.setItem('users', JSON.stringify(data));

  return data;
};
