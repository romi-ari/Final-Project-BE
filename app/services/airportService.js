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
      const airports = await airportRepository.findAll();
      const airportCount = await airportRepository.getTotalAirport();

      return {
        data: airports,
        count: airportCount,
      };
    } catch (err) {
      throw err;
    }
  },

  findOne(id){
    return airportRepository.findOne(id)
  },

  findByPk(id){
    return airportRepository.findByPk(id)
  }

  
};
