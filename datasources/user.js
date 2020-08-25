const { DataSource } = require("apollo-datasource");
const { v4: uuidv4 } = require("uuid");

const users = {};

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

  createUser(values) {
    const { displayName } = values;

    if (!displayName) {
      throw new Error("Display name cannot be empty");
    }

    const id = uuidv4();
    users[id] = {
      id,
      displayName,
    };

    return this.getUser(id);
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
};
