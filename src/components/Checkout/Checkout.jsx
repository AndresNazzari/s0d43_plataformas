import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  Input,
} from '@nextui-org/react';
import { useCartContext } from '../../context/CartContext.jsx';
import { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import { postOrder } from '../../services/orderService.js';

export const Checkout = () => {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const { cart, totalPrice, deleteCart } = useCartContext();
  const [isLoading, setIsLoading] = useState(false);
  const [buyerData, setBuyerData] = useState({
    name: '',
    address: '',
    email: '',
  });

  const handleSubmit = () => {
    setIsLoading(true);
    // llamar a la db para guardar el carrito?

    MySwal.fire({
      title: 'Checkout',
      text: 'Gracias por realizar tu compra!',
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar',
    })
      .then(async () => {
        await postOrder({ buyerData, cart, totalPrice });
        setIsLoading(false);
      })
      .then(() => {
        deleteCart();
        navigate('/');
      });
  };

  const handleFormOnChange = (e) => {
    setBuyerData({ ...buyerData, [e.target.name]: e.target.value });
  };

  return (
    <Accordion className="w-4/5" variant="bordered">
      <AccordionItem
        key="1"
        aria-label="Accordion 1"
        title="Checkout"
        subtitle={`Total a pagar $ ${totalPrice}`}
      >
        <Card>
          <CardBody className="flex flex-col justify-center items-center">
            <Input
              className="w-1/2"
              type="text"
              variant="bordered"
              label="Nombre"
              name="name"
              placeholder="Ingrese su nombre"
              onChange={handleFormOnChange}
            />
            <Input
              className="w-1/2 mt-4"
              name="address"
              type="text"
              variant="bordered"
              label="Direccion"
              placeholder="Ingrese su direccion"
              onChange={handleFormOnChange}
            />
            <Input
              className="w-1/2 mt-4"
              type="email"
              name="email"
              variant="bordered"
              label="Email"
              placeholder="Enter your email"
              onChange={handleFormOnChange}
            />
            <Button
              className="mt-4"
              color="secondary"
              isLoading={isLoading}
              onClick={handleSubmit}
            >
              Continuar
            </Button>
          </CardBody>
        </Card>
      </AccordionItem>
    </Accordion>
  );
};
