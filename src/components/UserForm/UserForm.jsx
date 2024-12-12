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
  Image,
} from '@nextui-org/react';

import { fetchRoles } from '../../services/rolesService.js';
import { updateUser, createUser } from '../../services/usersService.js';
import { capitalizeFirstLetter } from '../../utils/utils.js';

import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

export const UserForm = () => {
  const MySwal = withReactContent(Swal);
  const location = useLocation();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(['Rol']);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [userData, setUserData] = useState({
    id: 0,
    name: '',
    surname: '',
    image: 'https://nextui.org/images/hero-card-complete.jpeg',
    role: { id: 2, name: 'user' },
    email: '',
  });

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(', ').replaceAll('_', ' '),
    [selectedKeys]
  );

  useEffect(() => {
    if (location.state.user) {
      setUserData({ ...location.state.user });
      setSelectedKeys([location.state.user.roleId === 1 ? 'admin' : 'user']);
      setIsEditMode(true);
    }
    fetchRoles().then((data) => setRoles(data));
  }, [location.state]);

  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const handleFormOnChange = (e) => {
    if (e.target.name === 'email') {
      const validEmail = !validateEmail(e.target.value);
      setIsInvalidEmail(validEmail);
    }

    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleDropdownChange = (keys) => {
    setSelectedKeys(keys);
    setUserData({
      ...userData,
      role: {
        name: keys.values().next().value,
        id: keys.values().next().value === 'admin' ? 1 : 2,
      },
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const hasEmptyFields = Object.values(userData).some(
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
      let user
      if (isEditMode) {
        user = await updateUser(userData)
      } else {
        user = await createUser(userData);
      }
      if (!user) throw new Error();

      await MySwal.fire({
        title: `Usuario ${isEditMode ? 'editado' : 'creado'}`,
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
        text: 'Error en Login, algo salio mal!',
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
      });
    } finally {
      setIsLoading(false);
    }

    navigate('/dashboard/users');
  };

  return (
    <div className="flex flex-col items-center  justify-center">
      <h1 className="text-3xl font-bold text-center mt-6 mb-4">
        {isEditMode ? 'Editar' : 'Crear'} Usuario
      </h1>
      <Card className="w-80">
        <CardBody className="flex flex-col justify-center items-center ">
          <Input
            value={userData.name}
            isRequired
            className="w-72 mt-4"
            type="text"
            name="name"
            variant="bordered"
            label="Nombre"
            placeholder="Ingrese el nombre"
            onChange={handleFormOnChange}
          />
          <Input
            value={userData.surname}
            isRequired
            className="w-72 mt-4"
            type="text"
            name="surname"
            variant="bordered"
            label="Apellido"
            placeholder="Ingrese el apellido"
            onChange={handleFormOnChange}
          />
          <Input
            isRequired
            className="w-72 mt-4"
            type="email"
            name="email"
            variant="bordered"
            isInvalid={isInvalidEmail}
            color={isInvalidEmail ? 'danger' : ''}
            errorMessage="Ingrese un email valido"
            label="Email"
            placeholder="Ingrese su email"
            onChange={handleFormOnChange}
          />
          <Dropdown className="w-72 mt-4">
            <DropdownTrigger>
              <Button variant="bordered" className="capitalize w-72 mt-4">
                {selectedValue}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedKeys}
              onSelectionChange={handleDropdownChange}
            >
              {roles.map((role) => (
                <DropdownItem key={role.name}>
                  {capitalizeFirstLetter(role.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Input
            value={userData.image}
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
            alt="Image"
            src={userData.image}
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
