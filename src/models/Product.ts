import { model, Schema } from 'mongoose';

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    img: String,
    price: String,
    description: String,
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
  },
  { timestamps: true }
);

const Product = model('Product', ProductSchema);
export default Product;
