import { model, Schema } from 'mongoose';

const OrdersSchema = new Schema(
  {
    orders: [
      {
        order: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number,
      },
    ],
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Orders = model('Orders', OrdersSchema);
export default Orders;
