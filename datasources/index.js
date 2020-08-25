const FriendAPI = require("./friend");
const UserAPI = require("./user");
const StatusAPI = require("./status");

module.exports = function () {
  return {
    friendAPI: new FriendAPI(),
    statusAPI: new StatusAPI(),
    userAPI: new UserAPI(),
  };
};
