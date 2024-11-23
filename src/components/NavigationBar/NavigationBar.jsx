import {
  Avatar,
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import { fetchCategory } from '../../services/categoryService.js';
import { useEffect, useState } from 'react';
import { capitalizeFirstLetter } from '../../utils/utils.js';

import { NavAvatar } from '../NavAvatar';
import { useUserContext } from '../../context/AuthContext.jsx';
import { NavLink } from 'react-router-dom';

export const NavigationBar = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null); // Estado para el enlace activo
  const { user } = useUserContext();

  useEffect(() => {
    fetchCategory().then((data) => setCategories(data));
  }, []);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  return (
    <Navbar>
      <NavbarBrand>
        <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
          <path
            clipRule="evenodd"
            d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </svg>
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {categories.map((category) => (
          <NavbarItem
            key={category.id}
            isActive={activeCategory === category.name}
          >
            <NavLink
              className={`text-2xl font-bold ${activeCategory === category.id ? 'text-secondary' : ''}`}
              to={`/category/${category.name}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              {capitalizeFirstLetter(category.name)}
            </NavLink>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        {user ? <NavAvatar /> : <>Iniciar Sesión</>}
      </NavbarContent>
    </Navbar>
  );
};
