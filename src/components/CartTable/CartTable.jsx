import { useCartContext } from '../../context/CartContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
} from '@nextui-org/react';
import { DeleteIcon, EyeIcon } from '../Icons/index.js';
import { CART_COLUMNS } from '../../constants/cart.js';

export const CartTable = () => {
  const { cart, removeFromCart } = useCartContext();
  const navigate = useNavigate();

  const handleVerDetalles = (id) => {
    navigate(`/product/${id}`);
  };
  const handleEliminar = (item) => {
    removeFromCart(item);
  };

  const renderCell = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];
    switch (columnKey) {
      case 'title':
        return (
          <User
            avatarProps={{ radius: 'lg', src: item.image }}
            description={item.title}
            name={cellValue}
          >
            {item.title}
          </User>
        );
      case 'price':
        return (
          <Chip
            className="capitalize"
            color={item.price}
            size="sm"
            variant="flat"
          >
            $ {cellValue}
          </Chip>
        );
      case 'qty':
        return (
          <Chip
            className="capitalize"
            color={item.qty}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case 'subTotal':
        return (
          <Chip
            className="capitalize"
            color={item.qty}
            size="sm"
            variant="flat"
          >
            {item.price * item.qty}
          </Chip>
        );
      case 'actions':
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip content="Ver detalles">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => handleVerDetalles(item.id)}
              >
                <EyeIcon />
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
        return null;
    }
  }, []);

  return (
    <Table aria-label="Carrito de compras" className="w-4/5">
      <TableHeader columns={CART_COLUMNS}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={cart}>
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
