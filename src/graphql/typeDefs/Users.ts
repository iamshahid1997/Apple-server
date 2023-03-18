import { gql } from 'apollo-server';

export default gql`
  type Query {
    user(ID: ID!): User
  }

  type Mutation {
    registerUser(registerInput: RegisterInput): SuccessResponse
    loginUser(loginInput: LoginInput): SuccessResponse
  }

  type User {
    _id: String
    username: String
    email: String
    password: String
    token: String
  }

  input RegisterInput {
    username: String
    email: String
    password: String
  }

  input LoginInput {
    email: String
    password: String
  }

  type SuccessResponse {
    code: Int!
    success: Boolean!
    message: String!
    user: User
  }
`;
