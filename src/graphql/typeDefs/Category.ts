import { gql } from 'apollo-server';

export default gql`
  type Query {
    getCategories(amount: Int): [Category]!
  }
  type Mutation {
    createCategory(categoryInput: CategoryInput): SuccessResponse
  }

  type Category {
    _id: ID
    title: String
    createdAt: String
    updatedAt: String
  }

  input CategoryInput {
    title: String
  }

  type SuccessResponse {
    code: Int!
    success: Boolean
    message: String
  }
`;
