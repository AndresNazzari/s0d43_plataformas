import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ItemList } from '../../components/ItemList';
import { Loader } from '../../components/Loader';
import { getAllProducts } from '../../services/productsService.js';

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { category } = useParams();

  useEffect(() => {
    getAllProducts(category)
      .then((data) => setProducts(data))
      .then(() => setIsLoaded(true));
  }, [category]);

  return (
    <>
      {!products || products.length === 0 ? (
        <Loader />
      ) : (
        <ItemList products={products} isLoaded={isLoaded} />
      )}
    </>
  );
};
