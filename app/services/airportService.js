const airportRepository = require("../repositories/airportRepository");

module.exports = {
  create(requestBody) {
    return airportRepository.create(requestBody);
  },

  update(id, requestBody) {
    return airportRepository.update(id, requestBody);
  },

  destroy(id) {
    return airportRepository.destroy(id);
  },

  async list() {
    try {
      return await airportRepository.findAll();
    } catch (err) {
      throw err;
    }
  },

  findOne(id) {
    return airportRepository.findOne(id);
  },

  findByPk(id) {
    return airportRepository.findByPk(id);
  },
};
