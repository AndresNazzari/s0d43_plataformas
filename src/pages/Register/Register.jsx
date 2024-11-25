import { Button, Card, CardBody, Input } from '@nextui-org/react';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext.jsx';
import { useEffect, useState } from 'react';
import { EyeSlashFilledIcon } from '../../components/Icons/EyeSlashFilledIcon.jsx';
import { EyeFilledIcon } from '../../components/Icons/EyeFilledIcon.jsx';
import { createUser } from '../../services/usersService.js';
import { useUserContext } from '../../context/AuthContext.jsx';

export const Register = () => {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const { deleteCart } = useCartContext();
  const { user } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isPass2Visible, setIsPass2Visible] = useState(false);
  const [isInvalidPass, setIsInvalidPass] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);

  const [userData, setUserData] = useState({
    name: '',
    surname: '',
    address: '',
    email: '',
    password: '',
    password2: '',
    role: { id: 2, name: 'user' },
    image: 'https://nextui.org/images/hero-card-complete.jpeg',
  });

  useEffect(() => {
    // verificar con el login o cookie si el usuario ya esta logueado
    console.log('user', user);
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  const togglePassVisibility = () => setIsPassVisible(!isPassVisible);
  const togglePass2Visibility = () => setIsPass2Visible(!isPass2Visible);

  const handleSubmit = () => {
    setIsLoading(true);
    const hasEmptyFields = Object.values(userData).some(
      (value) => typeof value === 'string' && value.trim() === ''
    );

    if (isInvalidEmail || isInvalidPass || hasEmptyFields) {
      setIsLoading(false);
      MySwal.fire({
        title: 'Error',
        text: 'Error en registro, algun campo es incorrecto!',
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
      }).then(() => {
        setIsLoading(false);
      });

      return;
    }

    MySwal.fire({
      title: 'Felicidades!',
      text: 'Registro realizado con exito!',
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar',
    })
      .then(async () => {
        const user = await createUser(userData);

        setIsLoading(false);
      })
      .then(() => {
        deleteCart();
        navigate('/');
      });
  };

  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const handleFormOnChange = (e) => {
    if (e.target.name === 'email') {
      const validEmail = !validateEmail(e.target.value);
      setIsInvalidEmail(validEmail);
    }

    if (e.target.name === 'password') {
      const validPass = e.target.value !== userData.password2;
      setIsInvalidPass(validPass);
    }

    if (e.target.name === 'password2') {
      console.log('userData', userData);
      const validPass = e.target.value !== userData.password;
      console.log('userData.password', userData.password);
      setIsInvalidPass(validPass);
    }

    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center  justify-center">
      <h1 className="text-3xl font-bold text-center mt-6 mb-4">
        Registro de Usuario
      </h1>
      <Card className="w-80">
        <CardBody className="flex flex-col justify-center items-center ">
          <Input
            className="w-72"
            type="text"
            variant="bordered"
            label="Nombre"
            name="name"
            placeholder="Ingrese su nombre"
            isInvalid={false}
            onChange={handleFormOnChange}
          />
          <Input
            className="w-72 mt-4"
            type="text"
            variant="bordered"
            label="Apellido"
            name="surname"
            placeholder="Ingrese su apellido"
            onChange={handleFormOnChange}
          />
          <Input
            className="w-72 mt-4"
            name="address"
            type="text"
            variant="bordered"
            label="Direccion"
            placeholder="Ingrese su direccion"
            onChange={handleFormOnChange}
          />
          <Input
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
          <Input
            className="w-72 mt-4"
            name="password"
            variant="bordered"
            label="Constraseña"
            placeholder="Ingrese su contraseña"
            onChange={handleFormOnChange}
            isInvalid={isInvalidPass}
            color={isInvalidPass ? 'danger' : ''}
            type={isPassVisible ? 'text' : 'password'}
            errorMessage="Las contraseñas no coinciden"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={togglePassVisibility}
                aria-label="toggle password visibility"
              >
                {isPassVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
          />
          <Input
            className="w-72 mt-4"
            name="password2"
            variant="bordered"
            label="Verifique constraseña"
            placeholder="Repita su contraseña"
            onChange={handleFormOnChange}
            isInvalid={isInvalidPass}
            color={isInvalidPass ? 'danger' : ''}
            type={isPass2Visible ? 'text' : 'password'}
            errorMessage="Las contraseñas no coinciden"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={togglePass2Visibility}
                aria-label="toggle password visibility"
              >
                {isPass2Visible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
          />
          <Button
            className="mt-4"
            color="secondary"
            isLoading={isLoading}
            onClick={handleSubmit}
          >
            Registrar nuevo usuario
          </Button>
          <Button
            className="mt-4"
            size="sm"
            color="primary"
            variant="ghost"
            onClick={() => navigate('/login')}
          >
            Ir a Login
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};
