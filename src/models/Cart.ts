import { model, Schema } from 'mongoose';

const CartSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  quantity: {
    type: Number,
    default: 1,
  },
  added_by: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Cart = model('Cart', CartSchema);
export default Cart;
