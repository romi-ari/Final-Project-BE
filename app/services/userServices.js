const userRepository = require("../repositories/userRepositories");

module.exports = {
  create(requestBody) {
    return userRepository.create(requestBody);
  },

  update(id, requestBody) {
    return userRepository.update(id, requestBody);
  },

  delete(id) {
    return userRepository.delete(id);
  },

  async list() {
    try {
      return await userRepository.findAll();
    } catch (err) {
      throw err;
    }
  },

  async listByRole(role) {
    try {
      return await userRepository.findByRole(role);
    } catch (err) {
      throw err;
    }
  },

  get(id) {
    return userRepository.find(id);
  },

  findOne(id) {
    return userRepository.findOne(id);
  },

  findByPk(id) {
    return userRepository.findByPk(id);
  },
};
