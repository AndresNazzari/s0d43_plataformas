import {
  Avatar,
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { useCartContext } from '../../context/CartContext.jsx';
import { useUserContext } from '../../context/AuthContext.jsx';
import { capitalizeFirstLetter } from '../../utils/utils.js';
import { ROLES } from '../../constants/roles.js';

export const NavAvatar = () => {
  const { totalQty } = useCartContext();
  const { user } = useUserContext();

  return (
    <Badge content={totalQty} color="secondary">
      <Dropdown placement="bottom-end">
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
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">{user.email}</p>
            <p className="font-semibold">
              {capitalizeFirstLetter(user.role.name)}
            </p>
          </DropdownItem>
          <DropdownItem key="settings" href="/cart">
            Carrito
          </DropdownItem>
          <DropdownItem key="team_settings" href="/profile">
            Perfil
          </DropdownItem>
          {console.log(user)}
          {user?.role.id === ROLES.ADMIN.id && (
            <DropdownItem>Dashboard</DropdownItem>
          )}

          <DropdownItem key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Badge>
  );
};
