import { gql } from 'apollo-server';

export default gql`
  type Query {
    showCartItems(amount: Int!, ID: ID!): [Cart]!
    getTotalCount(amount: Int!, ID: ID!): Quantity
    getTotalPrice(amount: Int!, ID: ID!): Price
  }
  type Mutation {
    addToCart(PRODUCT_ID: ID!, USER_ID: ID!): SuccessResponse
    removeItemFromCart(PRODUCT_ID: ID!, USER_ID: ID): SuccessResponse
    removeCartOnSuccessPayment( USER_ID: ID): SuccessResponse
  }

  type Cart {
    _id: ID
    product: Product
    quantity: Int
    added_by: User
  }

  type Quantity {
    quantity: Int
  }

  type Price {
    price: Int
  }
  
`;
