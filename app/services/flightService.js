const flightRepository = require("../repositories/flightRespository");


module.exports = {
  create(requestBody) {
    return flightRepository.create(requestBody);
  },

  update(id, requestBody) {
    return flightRepository.update(id, requestBody);
  },

  destroy(id) {
    return flightRepository.destroy(id);
  },

  async list() {
    try {
      const flights = await flightRepository.findAll();
      const flightCount = await flightRepository.getTotalPlane();

      return {
        data: flights,
        count: flightCount,
      };
    } catch (err) {
      throw err;
    }
  },

  findOne(id){
    return flightRepository.findOne(id)
  },

  findByPk(id){
    return flightRepository.findByPk(id)
  }

  
};
