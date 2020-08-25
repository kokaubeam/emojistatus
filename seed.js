const { build, fake, perBuild, oneOf } = require("@jackfranklin/test-data-bot");
const moment = require("moment");

const userBuilder = build({
  fields: {
    displayName: fake((f) => f.name.findName()),
  },
});

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
  },
});

module.exports = function seed(datasources) {
  const { friendAPI, statusAPI, userAPI } = datasources();

  const userIds = [];
  for (let i = 0; i < 10; i++) {
    const { id } = userAPI.createUser(userBuilder());
    userIds.push(id);
  }

  userIds.forEach((userId) => {
    statusAPI.createOrUpdateStatusForUser(userId, statusBuilder().emoji);
  });

  for (let i = 0; i < userIds.length; i++) {
    for (let j = i + 1; j < userIds.length; j++) {
      if (Math.random() >= 0.3) {
        const leftUserId = userIds[i];
        const rightUserId = userIds[j];

        friendAPI.friendUsers(leftUserId, rightUserId);
      }
    }
  }
};
