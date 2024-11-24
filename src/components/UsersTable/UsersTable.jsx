import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  User,
  Chip,
  Tooltip,
} from '@nextui-org/react';
import { PlusIcon, DeleteIcon, EditIcon } from '../Icons';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { USERS_TABLE_COLUMNS } from '../../constants/dashboard.js';
import { fetchUsers } from '../../services/usersService.js';
import { Loader } from '../Loader/index.js';

export const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetchUsers()
      .then((data) => setUsers(data))
      .then(() => setIsLoaded(true));
  }, []);

  const handleEditar = (user) => {};

  const handleEliminar = (id) => {};

  const renderCell = useCallback((item, columnKey) => {
    const cellValue = users[columnKey];
    switch (columnKey) {
      case 'user':
        return (
          <User
            avatarProps={{ radius: 'lg', src: item.image }}
            description={item.name}
            name={cellValue}
          >
            {item.name} {item.surname}
          </User>
        );
      case 'email':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-tiny capitalize text-default-400">
              {item.email}
            </p>
          </div>
        );
      case 'role':
        return (
          <Chip
            className="capitalize"
            color={item.role.name}
            size="sm"
            variant="flat"
          >
            {item.role.name}
          </Chip>
        );
      case 'actions':
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip content="Editar">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => handleEditar(item.id)}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Eliminar del carrito">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => handleEliminar(item)}
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex ">
        <Button color="primary" endContent={<PlusIcon />}>
          Crear nuevo usuario
        </Button>
      </div>
    );
  }, []);

  return !isLoaded ? (
    <Loader />
  ) : (
    <Table
      aria-label="table"
      className="w-4/5"
      topContent={topContent}
      topContentPlacement="outside"
    >
      <TableHeader columns={USERS_TABLE_COLUMNS}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'No se encontraron usuarios'} items={users}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
