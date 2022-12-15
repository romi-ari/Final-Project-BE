const whislistRepository = require("../repositories/whislistRepository");

module.exports = {
  create(requestBody) {
    return whislistRepository.create(requestBody);
  },

  update(id, requestBody) {
    return whislistRepository.update(id, requestBody);
  },

  destroy(id) {
    return whislistRepository.destroy(id);
  },

  async list() {
    try {
      return await whislistRepository.findAll();
    } catch (err) {
      throw err;
    }
  },

  findOne(id) {
    return whislistRepository.findOne(id);
  },

  findByPk(id) {
    return whislistRepository.findByPk(id);
  },
};
