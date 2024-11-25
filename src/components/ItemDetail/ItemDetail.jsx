import styles from './ItemDetail.module.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/productsService.js';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Image,
  Skeleton,
} from '@nextui-org/react';
import { useCartContext } from '../../context/CartContext.jsx';
import { useUserContext } from '../../context/AuthContext.jsx';
import { capitalizeFirstLetter } from '../../utils/utils.js';

export function ItemDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const { addToCart } = useCartContext();
  const { user } = useUserContext();

  useEffect(() => {
    getProductById(id)
      .then((data) => setProduct(data))
      .then(() => setIsLoaded(true));
  }, [id]);

  const handleAddToCartClick = () => {
    addToCart(product, quantity);
  };

  const handleMinus = () => {
    setQuantity(quantity > 0 ? quantity - 1 : 0);
  };
  const handlePlus = () => {
    setQuantity(quantity + 1);
  };

  return (
    product &&
    isLoaded && (
      <div className="flex   items-center justify-center mt-8">
        <Card className="py-4 w-1/2">
          <Skeleton isLoaded={isLoaded} className="rounded-lg">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-bold">{product.title}</p>
              <small className="text-default-500">
                {capitalizeFirstLetter(product.category)}
              </small>
              <h4 className="font-bold text-large">{product.description}</h4>
            </CardHeader>
          </Skeleton>
          <Skeleton isLoaded={isLoaded} className="rounded-lg">
            <CardBody className="overflow-visible py-2">
              <div className="flex justify-center">
                <Image
                  alt={product.name}
                  className="object-cover rounded-xl"
                  src={product.image}
                  width={270}
                />
              </div>
              <div className="flex flex-grow gap-2 items-center">
                <div className="flex  flex-col">
                  <p className="text-2xl text-secondary/60 font-bold ">
                    Precio $ {product.price}
                  </p>
                  <p className="text-xl">
                    Rating {product.rating.rate}🌟 ({product.rating.count})
                  </p>
                </div>
              </div>
              {user ? (
                <>
                  <div className="flex justify-center items-center my-4">
                    <Button
                      color="primary"
                      variant="shadow"
                      onClick={handleMinus}
                    >
                      -
                    </Button>
                    <Chip className="mx-4" isDisabled color="secondary">
                      {quantity}
                    </Chip>

                    <Button
                      className=""
                      color="primary"
                      variant="shadow"
                      onClick={handlePlus}
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    color="primary"
                    variant="shadow"
                    onClick={handleAddToCartClick}
                  >
                    Agregar al carrito
                  </Button>
                </>
              ) : (
                <Button color="secondary" className="mt-4">
                  Logueate para agregar al carrito
                </Button>
              )}
            </CardBody>
          </Skeleton>
        </Card>
      </div>
    )
  );
}
