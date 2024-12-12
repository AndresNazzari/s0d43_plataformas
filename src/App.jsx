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
import { Register } from './pages/Register';
import { ProductForm } from './components/ProductForm';
import { UserForm } from './components/UserForm';
import { useEffect } from 'react';
import { ROLES } from './constants/roles.js';
import POKEMONS from './mock-old/products.js';
import { USERS } from './mock-old/USERS.js';

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
          <Route path="/category/:category" element={<Home />} />
          <Route path="/product/:id" element={<ItemDetail />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<PrivateRoute allowedRoles={usersAllowed} />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={adminAllowed} />}>
            <Route path="/dashboard/products" element={<Products />} />
            <Route path="/dashboard/products/form" element={<ProductForm />} />
            <Route path="/dashboard/users" element={<Users />} />
            <Route path="/dashboard/users/form" element={<UserForm />} />
          </Route>
        </Routes>
        <Footer />
      </NextUIProvider>
    </>
  );
}
