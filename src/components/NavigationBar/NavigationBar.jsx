import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import { MdOutlineCatchingPokemon } from 'react-icons/md';

import { fetchCategory } from '../../services/categoryService.js';
import { useEffect, useState } from 'react';
import { capitalizeFirstLetter } from '../../utils/utils.js';

import { NavAvatar } from '../NavAvatar';
import { useUserContext } from '../../context/AuthContext.jsx';
import { NavLink, useNavigate } from 'react-router-dom';
import { ChevronDownIcon } from '../Icons/index.js';

export const NavigationBar = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null); // Estado para el enlace activo
  const { user } = useUserContext();

  useEffect(() => {
    fetchCategory().then((data) => setCategories(data));
  }, []);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleLoginOnClick = () => {
    navigate('/login');
  };

  return (
    <Navbar isBordered>
      <NavLink className={`hover:text-violet-600 `} to={`/`}>
        <NavbarBrand className={`text-4xl font-bold  `}>
          <MdOutlineCatchingPokemon />
          <p className="font-bold text-inherit">POKETIENDA</p>
        </NavbarBrand>
      </NavLink>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <NavLink
            className={`text-2xl font-bold hover:text-violet-600 `}
            to={`/`}
          >
            Productos
          </NavLink>
        </NavbarItem>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="text-2xl font-bold p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<ChevronDownIcon />}
                radius="sm"
                variant="light"
              >
                Categorias
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-40"
            itemClasses={{
              base: 'gap-4',
            }}
          >
            {categories.map((category) => (
              <DropdownItem
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                href={`/category/${category.name}`}
              >
                {capitalizeFirstLetter(category.name)}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        <NavbarItem>
          <NavLink
            className={`text-2xl font-bold hover:text-violet-600 ${activeCategory === 'nosotros' ? 'text-secondary' : ''}`}
            to={`/nosotros`}
          >
            Nosotros
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink
            className={`text-2xl font-bold hover:text-violet-600 ${activeCategory === 'contacto' ? 'text-secondary' : ''}`}
            to={`/contacto`}
          >
            Contacto
          </NavLink>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        {user ? (
          <NavAvatar />
        ) : (
          <Button
            color="primary"
            variant="ghost"
            size="sm"
            onClick={handleLoginOnClick}
          >
            Iniciar Sesión
          </Button>
        )}
      </NavbarContent>
    </Navbar>
  );
};
