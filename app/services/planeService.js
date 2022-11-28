const planeRepository = require("../repositories/planeRepository");


module.exports = {
  create(requestBody) {
    return planeRepository.create(requestBody);
  },

  update(id, requestBody) {
    return planeRepository.update(id, requestBody);
  },

  destroy(id) {
    return planeRepository.destroy(id);
  },

  async list() {
    try {
      const planes = await planeRepository.findAll();
      const planeCount = await planeRepository.getTotalPlane();

      return {
        data: planes,
        count: planeCount,
      };
    } catch (err) {
      throw err;
    }
  },

  findOne(id){
    return planeRepository.findOne(id)
  },

  findByPk(id){
    return planeRepository.findByPk(id)
  }

  
};
