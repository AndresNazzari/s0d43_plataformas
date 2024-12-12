import fetchService from './fetchService';
import { ORDER } from '../constants/endpoints';

import { orders } from '../mock-old/orders.js';

export const getOrders = async () => {
  try {
    // const { data } = await fetchService({
    //   url: ORDER,
    // });
    // if (!data) return null;

    // const data = orders;

    const ordersStr = localStorage.getItem('orders');
    const ordersParsed = ordersStr ? JSON.parse(ordersStr) : [];
    // ordersParsed.push(...data);
    localStorage.setItem('orders', JSON.stringify(orders));

    return ordersParsed;
  } catch (error) {
    console.error('Error fetching user', error);
  }
};

export const postOrder = async (order) => {
  try {
    // const { data } = await fetchService({
    //   url: OREDR,
    //   data: order,
    //   method: 'post',
    // });
    // if (!data) return null;

    const ordersStr = localStorage.getItem('orders');
    const orders = ordersStr ? JSON.parse(ordersStr) : [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
  } catch (error) {
    console.error('Error fetching user', error);
  }
};
