import { createContext, useContext, useEffect, useState } from 'react';
import { fetchMe } from '../services/authService.js';
import { ROLES } from '../constants/roles.js';
import { getUsers } from '../services/usersService.js';
const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const logIn = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.password);
  };

  const logOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateUser = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // No se usara luego, solo para almacenar los users localmente
        await getUsers();
        const allUsers = localStorage.getItem('users');
        setAllUsers(JSON.parse(allUsers));
        ///

        if (localStorage.getItem('token')) {
          const data = await fetchMe();
          setUser(data);
        }
      } catch (error) {
        console.error('Error fetching user', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const contextValue = {
    user,
    setUser,
    logIn,
    logOut,
    updateUser,
    loading,
    setLoading,
  };
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
