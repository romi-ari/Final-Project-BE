const ticketRepository = require("../repositories/ticketRepository");

module.exports = {
  create(requestBody) {
    return ticketRepository.create(requestBody);
  },

  update(id, requestBody) {
    return ticketRepository.update(id, requestBody);
  },

  destroy(id) {
    return ticketRepository.destroy(id);
  },

  async list() {
    try {
      return await ticketRepository.findAll();
    } catch (err) {
      throw err;
    }
  },

  findOne(id) {
    return ticketRepository.findOne(id);
  },

  findByPk(id) {
    return ticketRepository.findByPk(id);
  },
};
