const { DataSource } = require("apollo-datasource");

const friendships = {};

module.exports = class FriendAPI extends DataSource {
  initialize(config) {
    this.context = config.context;
  }

  getFriendsForUser(userId) {
    if (!friendships[userId]) {
      return [];
    }

    return [...friendships[userId]];
  }

  friendUsers(leftUserId, rightUserId) {
    if (leftUserId === rightUserId) {
      throw new Error(`You're already your own best friend`);
    }

    if (!friendships[leftUserId]) {
      friendships[leftUserId] = new Set();
    }

    if (!friendships[rightUserId]) {
      friendships[rightUserId] = new Set();
    }

    friendships[leftUserId].add(rightUserId);
    friendships[rightUserId].add(leftUserId);
  }

  friend(userId) {
    const { currentUser } = this.context;

    if (!currentUser) {
      throw new Error("Must be logged in to make friends");
    }

    this.friendUsers(currentUser.id, userId);
  }

  unfriendUsers(leftUserId, rightUserId) {
    if (!friendships[leftUserId] || !friendships[rightUserId]) {
      throw new Error("User does not exist");
    }

    if (leftUserId === rightUserId) {
      throw new Error(`Afraid you're stuck with yourself`);
    }

    friendships[leftUserId].delete(rightUserId);
    friendships[rightUserId].delete(leftUserId);

    if (friendships[leftUserId].length === 0) {
      delete friendships[leftUserId];
    }

    if (friendships[rightUserId].length === 0) {
      delete friendships[rightUserId];
    }
  }

  unfriend(userId) {
    const { currentUser } = this.context;

    if (!currentUser) {
      throw new Error("Must be logged in to unfriend");
    }

    this.unfriendUsers(currentUser.id, userId);
  }
};
