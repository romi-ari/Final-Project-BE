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
      const users = await userRepository.findAll();
      const userCount = await userRepository.getTotalUser();

      return {
        data: users,
        count: userCount,
      };
    } catch (err) {
      throw err;
    }
  },

  async listByRole(role) {
    try {
      const users = await userRepository.findByRole(role);
      const userCount = await userRepository.getTotalUserByRole(role);

      return {
        data: users,
        count: userCount,
      };
    } catch (err) {
      throw err;
    }
  },

  get(id) {
    return userRepository.find(id);
  },

  findOne(id){
    return userRepository.findOne(id)
  },

  findByPk(id){
    return userRepository.findByPk(id)
  }

  
};
