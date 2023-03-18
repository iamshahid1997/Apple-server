import Orders from '../../models/Orders';

export default {
  Query: {
    async showAllOrders(_: any, { amount, ID }) {
      const allOrders = await Orders.find({ user: ID })
        .limit(amount)
        .sort({ createdAt: -1 })
        .populate({ path: 'orders.order', model: 'Product' })
        .populate({ path: 'user', model: 'User' });
      return allOrders;
    },
    async getLatestOrder(_: any, { amount, ID }: any) {
      const orders = await Orders.find({ user: ID })
        .limit(amount)
        .sort({ createdAt: -1 })
        .populate({ path: 'orders.order', model: 'Product' })
        .populate({ path: 'user', model: 'User' });

      const latestOrder = orders[0];
      return latestOrder;
    },
  },
};
