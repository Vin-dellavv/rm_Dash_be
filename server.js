import express from "express";
import cors from "cors";
import fs from "fs";
import { ApolloServer, gql } from "apollo-server-express";

import resolvers from "./resolvers.js";

// GraphQL schema def
const typeDefs = gql(fs.readFileSync('./schemas/index.graphql').toString('utf-8'));

// Init ApolloSrv
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
});
// warm-up
await server.start();

const port = 4000;

// Create Express
const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Run ApolloSrv by Express middleware
server.applyMiddleware({ app });

// Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}${server.graphqlPath}`);
});
