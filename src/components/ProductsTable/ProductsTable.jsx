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
import { PlusIcon, DeleteIcon, EyeIcon, EditIcon } from '../Icons';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { PRODUCTS_TABLE_COLUMNS } from '../../constants/dashboard.js';
import {
  deleteProduct,
  getAllProducts,
} from '../../services/productsService.js';
import { Loader } from '../Loader/index.js';
import { useNavigate } from 'react-router-dom';

export const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const rowsPerPage = 8;
  const [page, setPage] = useState(1);

  const pages = Math.ceil(products.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return products.slice(start, end);
  }, [page, products]);

  useEffect(() => {
    setLoading(true);
    getAllProducts()
      .then((data) => setProducts(data))
      .then(() => setLoading(false));
  }, []);

  const handleVerDetalles = (id) => {
    navigate(`/product/${id}`);
  };

  const handleProduct = (item) => {
    navigate(`/dashboard/products/form`, {
      state: { item },
    });
  };

  const handleEliminar = (id) => {
    const updatedProducts = deleteProduct(id);
    setProducts(updatedProducts);
  };

  const renderCell = useCallback((item, columnKey) => {
    const cellValue = products[columnKey];
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
      case 'category':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {item.category}
            </p>
          </div>
        );
      case 'description':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-tiny capitalize text-default-400">
              {item.description}
            </p>
          </div>
        );
      case 'price':
        return (
          <Chip
            className="capitalize"
            color={item.price}
            size="sm"
            variant="flat"
          >
            $ {item.price}
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
            <Tooltip content="Editar">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => handleProduct(item)}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Eliminar del carrito">
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
          onClick={() => handleProduct()}
        >
          Crear nuevo producto
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
      <TableHeader columns={PRODUCTS_TABLE_COLUMNS}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'No se encontraron productos'} items={items}>
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
