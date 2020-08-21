const UserAPI = require('./user')

module.exports = () => ({
  userAPI: new UserAPI(),
})
