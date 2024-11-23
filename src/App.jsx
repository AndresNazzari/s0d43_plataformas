import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './routing';
import { NavigationBar } from './components/NavigationBar';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Footer } from './components/Footer';
import { ItemDetail } from './components/ItemDetail';
import { NextUIProvider } from '@nextui-org/react';
import { useNavigate, useHref } from 'react-router-dom';
import { ROLES } from './constants/roles.js';

export default function App() {
  const navigate = useNavigate();
  const usersAllowed = [ROLES.ADMIN.id, ROLES.USER.id];
  const adminAllowed = [ROLES.ADMIN.id];

  return (
    <>
      <NextUIProvider navigate={navigate} useHref={useHref}>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ItemDetail />} />
          <Route path="/category/:category" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route element={<PrivateRoute allowedRoles={usersAllowed} />}>
            <Route path="/cart" element={<Home />} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={usersAllowed} />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={adminAllowed} />}>
            <Route path="/dashboard" element={<Profile />} />
          </Route>
        </Routes>
        <Footer />
      </NextUIProvider>
    </>
  );
}
