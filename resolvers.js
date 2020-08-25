module.exports = {
  User: {
    status: async ({ id }, __, { dataSources }) =>
      dataSources.statusAPI.getStatusForUser(id),
    friends: async ({ id }, __, { dataSources }) =>
      dataSources.friendAPI
        .getFriendsForUser(id)
        .map((userId) => dataSources.userAPI.getUser(userId)),
  },

  Query: {
    me: (_, __, { dataSources }) => dataSources.userAPI.getMe(),
    user: (_, { id }, { dataSources }) => dataSources.userAPI.getUser(id),
    users: (_, __, { dataSources }) => dataSources.userAPI.getUsers(),
  },

  Mutation: {
    updateUser: (_, { user: updates }, { dataSources }) =>
      dataSources.userAPI.updateUser(updates),
    updateStatus: (_, { emoji }, { dataSources }) => {
      dataSources.statusAPI.updateStatus(emoji);
      return dataSources.userAPI.getMe();
    },
    friend: (_, { userId }, { dataSources }) => {
      dataSources.friendAPI.friend(userId);
      return [dataSources.userAPI.getMe(), dataSources.userAPI.getUser(userId)];
    },
    unfriend: (_, { userId }, { dataSources }) => {
      dataSources.friendAPI.unfriend(userId);
      return [dataSources.userAPI.getMe(), dataSources.userAPI.getUser(userId)];
    },
  },
};
