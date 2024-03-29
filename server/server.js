const express = require('express');
// import ApolloServer
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
// import typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
// create new Apollo server and pass in schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  persistedQueries: {
    cache: "bounded",
  },
});

const app = express();

app.use(express.urlencoded({ extended: false })); //true or false?
app.use(express.json());


// create new instance of Apollo server with GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();

  // integrate Apollo server with Express application as middleware
  server.applyMiddleware({ app });

  // Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      // log where we can go to test GQL API
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
    })
  })
};

// call the async function to start server
startApolloServer(typeDefs, resolvers);