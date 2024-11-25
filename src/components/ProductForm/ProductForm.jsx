import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Textarea,
  Image,
} from '@nextui-org/react';

import { fetchCategory } from '../../services/categoryService.js';
import {
  updateProduct,
  createProduct,
} from '../../services/productsService.js';
import { capitalizeFirstLetter } from '../../utils/utils.js';
import { loginUser } from '../../services/usersService.js';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

export const ProductForm = () => {
  const MySwal = withReactContent(Swal);
  const location = useLocation();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(['Categoria']);
  const [productData, setProductData] = useState({
    id: 0,
    category: '',
    description: '',
    image: 'https://nextui.org/images/hero-card-complete.jpeg',
    price: 0,
    rating: { rate: 0, count: 0 },
    title: '',
  });

  const handleDropdownChange = (keys) => {
    setSelectedKeys(keys);
    setProductData({ ...productData, category: keys.values().next().value });
  };

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(', ').replaceAll('_', ' '),
    [selectedKeys]
  );

  useEffect(() => {
    if (location.state.item) {
      setProductData({ ...location.state.item });
      setSelectedKeys([location.state.item.category]);
      setIsEditMode(true);
    }
    fetchCategory().then((data) => setCategories(data));
  }, [location.state]);

  const handleFormOnChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const hasEmptyFields = Object.values(productData).some(
      (value) => typeof value === 'string' && value.trim() === ''
    );

    if (hasEmptyFields) {
      setIsLoading(false);
      MySwal.fire({
        title: 'Error',
        text: 'Error en formulario, algun campo esta vacio!',
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
      }).then(() => {
        setIsLoading(false);
      });
    }

    try {
      isEditMode
        ? await updateProduct(productData)
        : await createProduct(productData);
      await MySwal.fire({
        title: `Producto ${isEditMode ? 'editado' : 'creado'}`,
        text: 'Operacion realizada con exito!',
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
      });
    } catch (error) {
      console.error('Error login user', error);
      await MySwal.fire({
        title: 'Error',
        text: 'Error en Login, aglgo salio mal!',
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
      });
    } finally {
      setIsLoading(false);
    }

    navigate('/dashboard/products');
  };

  return (
    <div className="flex flex-col items-center  justify-center">
      <h1 className="text-3xl font-bold text-center mt-6 mb-4">
        {isEditMode ? 'Editar' : 'Crear'} Producto
      </h1>
      <Card className="w-80">
        <CardBody className="flex flex-col justify-center items-center ">
          <Input
            value={productData.title}
            isRequired
            className="w-72 mt-4"
            type="text"
            name="title"
            variant="bordered"
            label="Titulo"
            placeholder="Ingrese el titulo"
            onChange={handleFormOnChange}
          />
          <Textarea
            value={productData.description}
            variant={'bordered'}
            isRequired
            label="Descripcion"
            name="description"
            placeholder="Ingrese la descripcion"
            className="w-72 mt-4"
            onChange={handleFormOnChange}
          />
          <Dropdown className="w-72 mt-4">
            <DropdownTrigger>
              <Button variant="bordered" className="capitalize w-72 mt-4">
                {selectedValue}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Single selection example"
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedKeys}
              onSelectionChange={handleDropdownChange}
            >
              {categories.map((category) => (
                <DropdownItem key={category.name}>
                  {capitalizeFirstLetter(category.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Input
            value={productData.price}
            isRequired
            className="w-72 mt-4"
            type="number"
            name="price"
            variant="bordered"
            label="Precio"
            placeholder="Ingrese el precio"
            onChange={handleFormOnChange}
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
              </div>
            }
          />
          <Input
            value={productData.image}
            isRequired
            className="w-72 mt-4"
            type="text"
            name="image"
            variant="bordered"
            label="Imagen url"
            placeholder="Ingrese el url de la imagen"
            onChange={handleFormOnChange}
          />
          <Image
            className="mt-4"
            width={300}
            alt="NextUI hero Image"
            src={productData.image}
          />
          <Button
            className="mt-4 w-72"
            color="secondary"
            isLoading={isLoading}
            onClick={handleSubmit}
          >
            Grabar
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};
