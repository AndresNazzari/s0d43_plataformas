import styles from './Item.module.scss';
import {
  Card,
  CardFooter,
  CardHeader,
  Chip,
  Image,
  Skeleton,
} from '@nextui-org/react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useUserContext } from '../../context/AuthContext.jsx';

export function Item({ item, isLoaded }) {
  return (
    <Card isFooterBlurred className="w-[300px]">
      <Skeleton isLoaded={isLoaded} className="rounded-lg">
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <p className="text-tiny text-black/60 uppercase font-bold">
            {item.description}
          </p>
        </CardHeader>
      </Skeleton>
      <Skeleton isLoaded={isLoaded} className="rounded-lg">
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover"
          src={item.image}
        />
      </Skeleton>
      <Skeleton isLoaded={isLoaded} className="rounded-lg">
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            <div className="flex flex-col">
              <p className="text-tiny text-white/60">{item.title}</p>
              <p className="text-tiny text-white/60">$ {item.price}</p>
              <p className="text-tiny text-white/60">
                {item.rating.rate}🌟 ({item.rating.count})
              </p>
            </div>
          </div>
          <Link to={`/product/${item.id}`}>
            <Chip color="secondary" className="mr-2">
              Ver Detalle
            </Chip>
          </Link>
        </CardFooter>
      </Skeleton>
    </Card>
  );
}

Item.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    rating: PropTypes.shape({
      rate: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
