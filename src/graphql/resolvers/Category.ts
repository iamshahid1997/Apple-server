import Category from '../../models/Category';

export default {
  Query: {
    async getCategories(_: any, { amount }: any) {
      const categories = await Category.find()
        .sort({ createdAt: -1 })
        .limit(amount);
      return categories;
    },
  },
  Mutation: {
    async createCategory(_: any, { categoryInput: { title } }: any) {
      try {
        const category = await Category.findOne({ title });
        if (category) {
          return {
            code: 403,
            success: false,
            message: `Category with title ${title} already exists.`,
          };
        } else {
          const createdCategory = new Category({
            title: title,
          });

          await createdCategory.save();

          return {
            code: 200,
            success: true,
            message: `${title} category added`,
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
  },
};
