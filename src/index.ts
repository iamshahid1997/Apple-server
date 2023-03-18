import { ApolloServer, ExpressContext } from 'apollo-server-express';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

const MONGODB = process.env.MONGO_DB_URL;

// Apollo server
// typeDefs: GraphQL Type Definations
// resolvers: How do we resolve queries / mutations

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: ({ req }) => ({ req }),
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
  app.use(
    cors({
      origin: "https://localhost:3000",
      credentials: true,
    })
  );
}

startServer();

mongoose.connect(MONGODB).then(() => {
  console.log('🎉 connected to database successfully');
  return app.listen({ port: process.env.PORT }, () =>
    console.log(`🚀 Server ready at ${server.graphqlPath}`)
  );
});
