module.exports = {
  User: {
    status: async ({ id }, __, { dataSources }) =>
      dataSources.userAPI.getUserStatus(id),
    friends: async ({ id }, __, { dataSources }) =>
      dataSources.userAPI.getUserFriends(id),
  },

  Query: {
    me: (_, __, { dataSources }) => dataSources.userAPI.getMe(),
    user: (_, { id }, { dataSources }) => dataSources.userAPI.getUser(id),
    users: (_, __, { dataSources }) => dataSources.userAPI.getUsers(),
  },

  Mutation: {
    updateUser: (_, { user: updates }, { dataSources }) =>
      dataSources.userAPI.updateUser(updates),
    updateStatus: (_, { emoji }, { dataSources }) =>
      dataSources.userAPI.updateStatus(emoji),
    friend: (_, { userId }, { dataSources }) =>
      dataSources.userAPI.friend(userId),
    unfriend: (_, { userId }, { dataSources }) =>
      dataSources.userAPI.unfriend(userId),
  },
};
