import fetchService from './fetchService';
import { GET_ME } from '../constants/endpoints';
import { ROLES } from '../constants/roles';
import { users } from '../mock/users';

export const fetchMe = async () => {
  try {
    // const { data } = await fetchService({
    //   url: GET_ME,
    // });
    // if (!data) return null;

    return users.find(
      (user) => user.password === localStorage.getItem('token')
    );
  } catch (error) {
    console.error('Error fetching user', error);
  }
};
