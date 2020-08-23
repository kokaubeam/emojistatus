const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const dataSources = require("./datasources");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context: () => ({
    currentUser: {
      id: dataSources().userAPI.getUsers()[0].id,
    },
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
