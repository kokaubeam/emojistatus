const { DataSource } = require("apollo-datasource");
const moment = require("moment");

const statuses = {};

module.exports = class StatusAPI extends DataSource {
  initialize(config) {
    this.context = config.context;
  }

  getStatusForUser(userId) {
    if (!statuses[userId]) {
      throw new Error("User does not exist");
    }

    return statuses[userId];
  }

  createOrUpdateStatusForUser(userId, emoji) {
    statuses[userId] = {
      emoji,
      when: moment().toISOString(),
    };

    return this.getStatusForUser(userId);
  }

  updateStatus(emoji) {
    const { currentUser } = this.context;

    if (!currentUser) {
      throw new Error("Must be logged in to update your status");
    }

    return this.createOrUpdateStatusForUser(currentUser.id, emoji);
  }
};
