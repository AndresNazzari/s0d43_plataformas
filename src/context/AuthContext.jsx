import { createContext, useContext, useEffect, useState } from 'react';
import { fetchMe } from '../services/authService.js';
import { ROLES } from '../constants/roles.js';
const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logIn = (userData) => {
    setUser(userData);
  };

  const logOut = () => {
    setUser(null);
  };

  const updateUser = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
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
