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
  Pagination,
} from '@nextui-org/react';
import { PlusIcon, DeleteIcon, EditIcon } from '../Icons';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { USERS_TABLE_COLUMNS } from '../../constants/dashboard.js';
import { deleteUser, getUsers } from '../../services/usersService.js';
import { Loader } from '../Loader/index.js';
import { useNavigate } from 'react-router-dom';

export const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const rowsPerPage = 8;
  const [page, setPage] = useState(1);

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);

  useEffect(() => {
    setLoading(true);
    getUsers()
      .then((data) => setUsers(data))
      .then(() => setLoading(false));
  }, []);

  const handleUser = (user) => {
    console.log('user', user);
    navigate(`/dashboard/users/form`, {
      state: { user },
    });
  };

  const handleEliminar = async (id) => {
    const updatedUsers = await deleteUser(id);
    setUsers(updatedUsers);
  };

  const renderCell = useCallback((item, columnKey) => {
    const cellValue = users[columnKey];
    switch (columnKey) {
      case 'user':
        return (
          <User
            avatarProps={{ radius: 'lg', src: item.image }}
            description={`${item.name} ${item.surname}`}
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
                onClick={() => handleUser(item)}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Eliminar usuario">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => handleEliminar(item.id)}
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
        <Button
          color="primary"
          endContent={<PlusIcon />}
          onClick={() => handleUser()}
        >
          Crear nuevo usuario
        </Button>
      </div>
    );
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Table
      aria-label="table"
      className="w-4/5"
      topContent={topContent}
      topContentPlacement="outside"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
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
      <TableBody emptyContent={'No se encontraron usuarios'} items={items}>
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
