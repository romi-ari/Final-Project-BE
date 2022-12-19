const notification = require("../repositories/notificationRespository");

module.exports = {
  create(requestBody) {
    return notification.create(requestBody);
  },

  update(id, requestBody) {
    return notification.update(id, requestBody);
  },

  destroy(id) {
    return notification.destroy(id);
  },

  async list() {
    try {
      return await notification.findAll();
    } catch (err) {
      throw err;
    }
  },

  findOne(id) {
    return notification.findOne(id);
  },

  findByPk(id) {
    return notification.findByPk(id);
  },
};
