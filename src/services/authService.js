import fetchService from './fetchService';
import { GET_ME } from '../constants/endpoints';
import { ROLES } from '../constants/roles';


export const fetchMe = async () => {
  try {
    const res = await fetchService({
      url: GET_ME,
    });
    console.log(res)
    if (res.status === 200) {
      return res.data.user;
    }
  } catch (error) {
    console.error('Error fetching user', error);
  }
};
