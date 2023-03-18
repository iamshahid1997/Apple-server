import { gql } from 'apollo-server';

export default gql`
  type Query {
    getProducts(amount: Int, CATEGORY_ID: ID!): [Product]!
    getProduct(PRODUCT_ID: ID!): Product
  }
  type Mutation {
    createProduct(
      categoryInput: CategoryInput
      productInput: ProductInput
    ): SuccessResponse
  }

  type Product {
    _id: ID!
    name: String!
    img: String!
    price: Int!
    description: String
    category: Category
    createdAt: String
    updatedAt: String
  }

  input ProductInput {
    name: String!
    img: String!
    price: Int!
    description: String
  }
`;
