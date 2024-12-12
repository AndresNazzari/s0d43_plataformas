import { Button, Card, CardBody, Input } from '@nextui-org/react';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { EyeSlashFilledIcon } from '../../components/Icons/EyeSlashFilledIcon.jsx';
import { EyeFilledIcon } from '../../components/Icons/EyeFilledIcon.jsx';
import { loginUser } from '../../services/usersService.js';
import { useUserContext } from '../../context/AuthContext.jsx';

export const Login = () => {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const { user, logIn } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  const togglePassVisibility = () => setIsPassVisible(!isPassVisible);

  const handleSubmit = async () => {
    setIsLoading(true);
    const hasEmptyFields = Object.values(userData).some(
      (value) => value.trim() === ''
    );

    if (isInvalidEmail || hasEmptyFields) {
      setIsLoading(false);
      MySwal.fire({
        title: 'Error',
        text: 'Error en Login, algun campo es incorrecto!',
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
      }).then(() => {
        setIsLoading(false);
      });
    }

    try {
      const data = await loginUser(userData);
      if (!data) throw new Error('User not found');
      logIn(data);
    } catch (error) {
      console.error('Error login user', error);
      MySwal.fire({
        title: 'Error',
        text: 'Error en Login, aglgo salio mal!',
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
      }).then(() => {
        setIsLoading(false);
      });
      return;
    }

    setIsLoading(false);
    navigate('/');
  };

  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const handleFormOnChange = (e) => {
    if (e.target.name === 'email') {
      const validEmail = !validateEmail(e.target.value);
      setIsInvalidEmail(validEmail);
    }

    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center  justify-center">
      <h1 className="text-3xl font-bold text-center mt-6 mb-4">
        Login de Usuario
      </h1>
      <Card className="w-80">
        <CardBody className="flex flex-col justify-center items-center ">
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
            type={isPassVisible ? 'text' : 'password'}
            variant="bordered"
            label="Constraseña"
            placeholder="Ingrese su contraseña"
            onChange={handleFormOnChange}
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
          <Button
            className="mt-4"
            color="secondary"
            isLoading={isLoading}
            onClick={handleSubmit}
          >
            Ingresar
          </Button>
          <Button
            className="mt-4"
            size="sm"
            color="primary"
            variant="ghost"
            onClick={() => navigate('/register')}
          >
            Ir a Registro
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};
