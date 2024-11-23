import fetchService from './fetchService';
import { GET_USER } from '../constants/endpoints';
import { ROLES } from '../constants/roles';
import { users } from '../mock/users';

export const fetchUser = async () => {
  try {
    // const { data } = await fetchService({
    //   url: GET_USER,
    // });
    // if (!data) return null;

    const data = users;
    const user = data.find(
      (user) => user.password === localStorage.getItem('token')
    );

    return user;
  } catch (error) {
    console.error('Error fetching user', error);
  }
};
