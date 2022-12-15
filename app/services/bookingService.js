const bookingRepository = require("../repositories/bookingRepository");


module.exports = {
  create(requestBody) {
    return bookingRepository.create(requestBody);
  },

  update(id, requestBody) {
    return bookingRepository.update(id, requestBody);
  },

  destroy(id) {
    return bookingRepository.destroy(id);
  },

  async list() {
    try {
      return await bookingRepository.findAll();
    } catch (err) {
      throw err;
    }
  },

  findOne(id){
    return bookingRepository.findOne(id)
  },

  findByPk(id){
    return bookingRepository.findByPk(id)
  }

  
};
