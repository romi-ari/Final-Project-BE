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
      const tickets = await ticketRepository.findAll();
      const ticketCount = await ticketRepository.getTotalTicket();

      return {
        data: tickets,
        count: ticketCount,
      };
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
