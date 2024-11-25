export const getAllProducts = async (category) => {
  const productsStr = localStorage.getItem('products');
  const products = JSON.parse(productsStr);

  if (category) {
    return products?.filter((product) => product.category === category);
  }

  return products;
};

export const getProductById = async (id) => {
  const productsStr = localStorage.getItem('products');
  const product = JSON.parse(productsStr);

  return product?.find((product) => product.id === parseInt(id));
};

export const deleteProduct = (id) => {
  const productsStr = localStorage.getItem('products');
  const product = JSON.parse(productsStr);
  const data = product?.filter((product) => product.id !== parseInt(id));

  localStorage.setItem('products', JSON.stringify(data));
  return data;
};

export const createProduct = async (product) => {
  const productsStr = localStorage.getItem('products');
  const products = JSON.parse(productsStr);
  const newProduct = { ...product, id: products.length + 1 };
  const data = [...products, newProduct];
  localStorage.setItem('products', JSON.stringify(data));

  return data;
};

export const updateProduct = async (product) => {
  const productsStr = localStorage.getItem('products');
  const products = JSON.parse(productsStr);
  const data = products.map((item) =>
    item.id === product.id ? product : item
  );

  localStorage.setItem('products', JSON.stringify(data));

  return data;
};
