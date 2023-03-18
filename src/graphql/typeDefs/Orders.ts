import { gql } from 'apollo-server';

export default gql`
  type Query {
    showAllOrders(amount: Int!, ID: ID!): [Orders]!
    getLatestOrder(amount: Int!, ID: ID!): Orders!
  }

  type Orders {
    _id: ID
    orders: [OrderSummary]
    createdAt: String
    user: User
  }

  type OrderSummary {
    order: Product
    quantity: Int
  }
`;
