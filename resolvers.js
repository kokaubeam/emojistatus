module.exports = {
  User: {
    status: async ({ id }, __, { dataSources }) =>
      dataSources.userAPI.getUserStatus(id),
    friends: async ({ id }, __, { dataSources }) =>
      dataSources.userAPI.getFriendsOfUser(id),
  },

  Query: {
    me: (_, __, { userId, dataSources }) => dataSources.userAPI.getUser(userId),
    user: (_, { id }, { dataSources }) => dataSources.userAPI.getUser(id),
    users: (_, __, { dataSources }) => dataSources.userAPI.getUsers(),
  },

  Mutation: {
    updateUser: (_, { user: updates }, { userId, dataSources }) =>
      dataSources.userAPI.updateUser(userId, updates),
    updateStatus: (_, { emoji }, { userId, dataSources }) =>
      dataSources.userAPI.updateStatus(userId, emoji),
    friend: (
      _,
      { userId: targetUserId },
      { userId: currentUserId, dataSources }
    ) => dataSources.userAPI.friend(currentUserId, targetUserId),
    unfriend: (
      _,
      { userId: targetUserId },
      { userId: currentUserId, dataSources }
    ) => dataSources.userAPI.unfriend(currentUserId, targetUserId),
  },
};
