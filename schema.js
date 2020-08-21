const { gql } = require("apollo-server");

module.exports = gql`
  type Status {
    emoji: String!
    when: String!
  }

  type User {
    id: ID!
    displayName: String!
    status: Status!
    friends: [User]!
  }

  type Query {
    me: User
    user(id: ID!): User
    users: [User]!
  }

  input UserInput {
    displayName: String
  }

  type Mutation {
    updateUser(user: UserInput!): User!
    updateStatus(emoji: String!): User!
    friend(userId: ID!): [User]!
    unfriend(userId: ID!): [User]!
  }
`;
