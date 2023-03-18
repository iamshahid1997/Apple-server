import Cart from '../../models/Cart';
import Product from '../../models/Product';
import User from '../../models/Users';
import Orders from '../../models/Orders';

export default {
  Query: {
    async showCartItems(_: any, { amount, ID }: any) {
      const cartItems = await Cart.find({ added_by: ID })
        .limit(amount)
        .populate({ path: 'product', model: 'Product' })
        .populate({ path: 'added_by', model: 'User' });
      return cartItems;
    },
    async getTotalCount(_: any, { amount, ID }) {
      const cartItems = await Cart.find({ added_by: ID }).limit(amount);
      let totalCount = 0;

      cartItems.map((item) => (totalCount = item.quantity + totalCount));

      return {
        quantity: totalCount,
      };
    },
    async getTotalPrice(_: any, { amount, ID }: any) {
      const cartItems = await Cart.find({ added_by: ID })
        .limit(amount)
        .populate({ path: 'product', model: 'Product' });
      let totalPrice = 0;

      cartItems.map(
        (item: any) =>
          (totalPrice =
            totalPrice + parseInt(item.product.price) * item.quantity)
      );
      return {
        price: totalPrice,
      };
    },
  },
  Mutation: {
    async addToCart(_: any, { PRODUCT_ID, USER_ID }: any) {
      try {
        const user = await User.findById(USER_ID);
        const product = await Product.findById(PRODUCT_ID);
        const cartProduct = await Cart.findOne({ product: PRODUCT_ID });
        if (cartProduct) {
          const productQuantity = cartProduct.quantity + 1;
          await cartProduct.updateOne({ quantity: productQuantity });
          return {
            code: 200,
            success: true,
            message: 'Successfully increased to the cart',
          };
        } else {
          const cart = new Cart({
            product: product,
            quantity: 1,
            added_by: user,
          });
          await cart.save();
          return {
            code: 200,
            success: true,
            message: 'Successfully added to the cart',
          };
        }
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
        };
      }
    },
    async removeItemFromCart(_: any, { PRODUCT_ID, USER_ID }) {
      try {
        const cartItem = await Cart.findOne({
          product: PRODUCT_ID,
          added_by: USER_ID,
        });
        if (cartItem) {
          if (cartItem.quantity > 1) {
            const decreaseQuantity = cartItem.quantity - 1;
            await cartItem.update({ quantity: decreaseQuantity });
            return {
              code: 200,
              success: true,
              message: 'Successfully removed one item.',
            };
          } else {
            await cartItem.delete();
            return {
              code: 200,
              success: true,
              message: 'Successfully removed item.',
            };
          }
        } else {
          return {
            code: 403,
            success: false,
            message: 'Product not found in your cart.',
          };
        }
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
        };
      }
    },
    async removeCartOnSuccessPayment(_: any, { USER_ID }) {
      const cartItems = await Cart.find({ added_by: USER_ID });
      let cartProducts = [];
      cartItems.map((item) => {
        cartProducts.push({
          order: item.product,
          quantity: item.quantity,
        });
      });
      if (cartItems.length > 0) {
        const creadtedOrder = new Orders({
          orders: cartProducts,
          user: USER_ID,
        });
        await creadtedOrder.save();
        await Cart.remove({});
        return {
          code: 200,
          success: true,
          message: 'Successfully added to orders list',
        };
      } else {
        return {
          code: 403,
          success: false,
          message: 'There is nothing in the cart.',
        };
      }
    },
  },
};
