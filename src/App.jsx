import { Route, Routes } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { PrivateRoute } from './routing';
import { NavigationBar } from './components/NavigationBar';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Footer } from './components/Footer';
import { ItemDetail } from './components/ItemDetail';
import { useNavigate, useHref } from 'react-router-dom';
import { Products } from './pages/Dashboard/Products';
import { Users } from './pages/Dashboard/Users';
import { Cart } from './pages/Cart';
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
            <Route path="/cart" element={<Cart />} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={usersAllowed} />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={adminAllowed} />}>
            <Route path="/dashboard/products" element={<Products />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={adminAllowed} />}>
            <Route path="/dashboard/users" element={<Users />} />
          </Route>
        </Routes>
        <Footer />
      </NextUIProvider>
    </>
  );
}
