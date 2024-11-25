import {
  Avatar,
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react';
import { useCartContext } from '../../context/CartContext.jsx';
import { useUserContext } from '../../context/AuthContext.jsx';
import { capitalizeFirstLetter } from '../../utils/utils.js';
import { ROLES } from '../../constants/roles.js';
import { useNavigate } from 'react-router-dom';

export const NavAvatar = () => {
  const { totalQty } = useCartContext();
  const { user, logOut } = useUserContext();

  const handleLogoutOnClick = () => {
    logOut();
  };

  return (
    <Badge content={totalQty} color="secondary">
      <Dropdown placement="bottom-end" backdrop="blur">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="secondary"
            name="Jason Hughes"
            size="sm"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Acciones" variant="flat">
          <DropdownSection title="Acciones">
            <DropdownItem href="/profile" key="profile1" className="h-14 gap-2">
              <p className="font-semibold">{user.email}</p>
              <p className="font-semibold">
                {capitalizeFirstLetter(user.role.name)}
              </p>
            </DropdownItem>
            <DropdownItem key="cart" href="/cart">
              Carrito
            </DropdownItem>
            <DropdownItem key="profile" href="/profile">
              Perfil
            </DropdownItem>
          </DropdownSection>
          {user?.role.id === ROLES.ADMIN.id && (
            <DropdownSection title="Dashboard">
              <DropdownItem
                href="/dashboard/products"
                className="text-secondary"
                description="Gestiona los productos"
              >
                Productos
              </DropdownItem>
              <DropdownItem
                href="/dashboard/users"
                className="text-secondary"
                description="Gestiona los usuarios"
              >
                Usuarios
              </DropdownItem>
            </DropdownSection>
          )}
          <DropdownItem
            key="logout"
            color="danger"
            onClick={handleLogoutOnClick}
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Badge>
  );
};
