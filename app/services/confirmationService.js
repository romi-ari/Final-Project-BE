const confirmationRepository = require("../repositories/confirmationRepository");


module.exports = {
  create(requestBody) {
    return confirmationRepository.create(requestBody);
  },

  update(id, requestBody) {
    return confirmationRepository.update(id, requestBody);
  },

  destroy(id) {
    return confirmationRepository.destroy(id);
  },

  async list() {
    try {
      const confirmation = await confirmationRepository.findAll();
      const confirmationCount = await confirmationRepository.getTotalAirport();

      return {
        data: confirmation,
        count: confirmationCount,
      };
    } catch (err) {
      throw err;
    }
  },

  findOne(id){
    return confirmationRepository.findOne(id)
  },

  findByPk(id){
    return confirmationRepository.findByPk(id)
  }

  
};
