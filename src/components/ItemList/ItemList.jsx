import styles from './ItemList.module.scss';
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
