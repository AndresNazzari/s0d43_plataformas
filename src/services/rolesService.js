import { roles } from '../mock-old/roles.js';

export const fetchRoles = async () => {
  try {
    return roles;
  } catch (error) {
    console.error('Error fetching roles', error);
  }
};
