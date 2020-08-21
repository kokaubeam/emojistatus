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
    status: perBuild(() => statusBuilder()),
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
  constructor() {
    super();
  }

  initialize(config) {
    this.context = config.context;
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

  getFriendsOfUser(userId) {
    if (!users[userId]) {
      throw new Error("User does not exist");
    }

    return [...friendships[userId]].map((userIdOfFriend) =>
      this.getUser(userIdOfFriend)
    );
  }

  updateStatus(userId, emoji) {
    if (!users[userId]) {
      throw new Error("User does not exist");
    }

    statuses[userId] = {
      emoji,
      when: moment().toISOString(),
    };

    return users[userId];
  }

  updateUser(userId, updates) {
    if (!users[userId]) {
      throw new Error("User does not exist");
    }

    if (typeof updates.displayName !== "undefined") {
      if (!updates.displayName) {
        throw new Error("Display name cannot be empty");
      }

      users[userId].displayName = updates.displayName;
    }

    return users[userId];
  }

  friend(leftUserId, rightUserId) {
    if (!users[leftUserId] || !users[rightUserId]) {
      throw new Error("User does not exist");
    }

    if (leftUserId === rightUserId) {
      throw new Error(`You're already your own best friend`);
    }

    friendships[leftUserId].add(rightUserId);
    friendships[rightUserId].add(leftUserId);

    return [users[leftUserId], users[rightUserId]];
  }

  unfriend(leftUserId, rightUserId) {
    if (!users[leftUserId] || !users[rightUserId]) {
      throw new Error("User does not exist");
    }

    if (leftUserId === rightUserId) {
      throw new Error(`You're already your own best friend`);
    }

    friendships[leftUserId].delete(rightUserId);
    friendships[rightUserId].delete(leftUserId);

    return [users[leftUserId], users[rightUserId]];
  }
};
