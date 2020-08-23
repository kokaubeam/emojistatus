const { DataSource } = require("apollo-datasource");
const { build, fake, perBuild, oneOf } = require("@jackfranklin/test-data-bot");
const moment = require("moment");

const statusBuilder = build({
  fields: {
    emoji: oneOf(
      "🙂",
      "🤣",
      "🥰",
      "🥳",
      "🤪",
      "😭",
      "🤯",
      "🎮",
      "🪂",
      "😡",
      "🥶",
      "🙄",
      "🧇",
      "🍦"
    ),
    when: fake((f) => moment(f.date.recent()).toISOString()),
  },
});

const userBuilder = build({
  fields: {
    id: fake((f) => f.random.uuid()),
    displayName: fake((f) => f.name.findName()),
  },
});

const userIds = [];
const users = {};
for (let i = 0; i < 10; i++) {
  const user = userBuilder();
  userIds.push(user.id);
  users[user.id] = user;
}

const statuses = userIds.reduce((statuses, userId) => {
  statuses[userId] = statusBuilder();
  return statuses;
}, {});

const friendships = userIds.reduce((friendships, userId) => {
  friendships[userId] = new Set();
  return friendships;
}, {});
for (let i = 0; i < userIds.length; i++) {
  for (let j = i + 1; j < userIds.length; j++) {
    if (Math.random() >= 0.3) {
      const leftUserId = userIds[i];
      const rightUserId = userIds[j];

      friendships[leftUserId].add(rightUserId);
      friendships[rightUserId].add(leftUserId);
    }
  }
}

module.exports = class UserAPI extends DataSource {
  initialize(config) {
    this.context = config.context;
  }

  getMe() {
    const { currentUser } = this.context;

    return this.getUser(currentUser.id);
  }

  getUser(id) {
    if (!users[id]) {
      return null;
    }

    const { displayName } = users[id];

    return {
      id,
      displayName,
    };
  }

  getUsers() {
    return Object.keys(users).map((id) => {
      return {
        id,
        displayName: users[id].displayName,
      };
    });
  }

  getUserStatus(userId) {
    if (!users[userId]) {
      throw new Error("User does not exist");
    }

    return statuses[userId];
  }

  getUserFriends(userId) {
    if (!users[userId]) {
      throw new Error("User does not exist");
    }

    return [...friendships[userId]].map((userIdOfFriend) =>
      this.getUser(userIdOfFriend)
    );
  }

  updateStatus(emoji) {
    const { currentUser } = this.context;

    if (!currentUser || !users[currentUser.id]) {
      throw new Error("User does not exist");
    }

    statuses[currentUser.id] = {
      emoji,
      when: moment().toISOString(),
    };

    return this.getUser(currentUser.id);
  }

  updateUser(updates) {
    const { currentUser } = this.context;

    if (!currentUser || !users[currentUser.id]) {
      throw new Error("User does not exist");
    }

    if (typeof updates.displayName !== "undefined") {
      if (!updates.displayName) {
        throw new Error("Display name cannot be empty");
      }

      users[currentUser.id].displayName = updates.displayName;
    }

    return this.getUser(currentUser.id);
  }

  friend(userId) {
    const { currentUser } = this.context;

    if (!currentUser || !users[currentUser.id] || !users[userId]) {
      throw new Error("User does not exist");
    }

    if (currentUser.id === userId) {
      throw new Error(`You're already your own best friend`);
    }

    friendships[currentUser.id].add(userId);
    friendships[userId].add(currentUser.id);

    return [this.getUser(currentUser.id), this.getUser(userId)];
  }

  unfriend(userId) {
    const { currentUser } = this.context;

    if (!currentUser || !users[currentUser.id] || !users[userId]) {
      throw new Error("User does not exist");
    }

    if (currentUser.id === userId) {
      throw new Error(`Afraid you're stuck with yourself`);
    }

    friendships[currentUser.id].delete(userId);
    friendships[userId].delete(currentUser.id);

    return [this.getUser(currentUser.id), this.getUser(userId)];
  }
};
