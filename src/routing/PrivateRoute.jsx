import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/AuthContext.jsx';

export function PrivateRoute({ allowedRoles }) {
  const navigate = useNavigate();

  const { user, loading } = useUserContext();

  useEffect(() => {
    if (!user && !loading) {
      console.log('useEffect PrivateRoute');
      navigate('/login');
    }
    if (user && !allowedRoles.includes(user.role.id)) {
      navigate('/');
    }
  }, [user, loading, navigate, allowedRoles]);

  return user && allowedRoles?.includes(user.role.id) ? <Outlet /> : '';
}

PrivateRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.number).isRequired,
};
