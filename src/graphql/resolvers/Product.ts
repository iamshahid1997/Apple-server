import Category from '../../models/Category';
import Product from '../../models/Product';

export default {
  Query: {
    async getProducts(_: any, { amount, CATEGORY_ID }: any) {
      const products = await Product.find({ category: CATEGORY_ID })
        .sort({ createdAt: -1 })
        .limit(amount)
        .populate({ path: 'category', model: 'Category' });

      return products;
    },
    async getProduct(_: any, { PRODUCT_ID }) {
      const product = await Product.findById(PRODUCT_ID).populate({
        path: 'category',
        model: 'Category',
      });

      if (!product) {
        return null;
      }
      return product;
    },
  },
  Mutation: {
    async createProduct(
      _: any,
      {
        categoryInput: { title },
        productInput: { name, img, price, description },
      }
    ) {
      try {
        const category = await Category.findOne({ title });
        const createdProduct = new Product({
          name: name,
          img: img,
          price: price,
          description: description,
          category: category,
        });

        await createdProduct.save();

        return {
          code: 200,
          success: true,
          message: 'Product created successfully',
        };
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
        };
      }
    },
  },
};
