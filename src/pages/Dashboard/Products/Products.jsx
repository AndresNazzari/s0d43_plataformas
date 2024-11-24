import { useEffect, useState } from 'react';
import { ProductsTable } from '../../../components/ProductsTable';
import { Checkout } from '../../../components/Checkout/index.js';

export const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log('Products');
  }, []);
  return (
    <div className="flex flex-col items-center  justify-center">
      <h1 className="text-3xl font-bold text-center mt-6 mb-4">
        Listado de productos
      </h1>
      <ProductsTable />
    </div>
  );
};
