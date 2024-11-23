import styles from './ItemList.module.scss';
import PropTypes from 'prop-types';
import { Item } from '../Item';

export function ItemList({ products, isLoaded }) {
  return (
    <>
      <h1 className="text-3xl font-bold text-center mt-6">Productos</h1>
      <div className="flex flex-wrap justify-center max-w-5/6 gap-3 px-8 mt-6">
        {products.map((product) => (
          <Item key={product.id} item={product} isLoaded={isLoaded} />
        ))}
      </div>
    </>
  );
}

ItemList.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
};
