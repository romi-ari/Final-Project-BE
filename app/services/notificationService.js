const notificationRepository = require("../repositories/notificationRespository");


module.exports = {
  create(requestBody) {
    return notificationRepository.create(requestBody);
  },

  update(id, requestBody) {
    return notificationRepository.update(id, requestBody);
  },

  destroy(id) {
    return notificationRepository.destroy(id);
  },

  async list() {
    try {
      return await notificationRepository.findAll();
    } catch (err) {
      throw err;
    }
  },

  findOne(id){
    return notificationRepository.findOne(id)
  },

  findByPk(id){
    return notificationRepository.findByPk(id)
  }

  
};
