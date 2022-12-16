const { Notification }  = require("../models");

module.exports = {

  create(createArgs) {
    return Notification.create(createArgs);
  },

  update(id, updateArgs) {
    return Notification.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  destroy(id) {
    return Notification.destroy({  
        where: {id: id},
        });
  },

  findByPk(id) {
    return Notification.findByPk(id);
  },

  findOne(id) {
    return Notification.findOne(id);
  },

  findAll() {
    return Notification.findAll();
  },

  getTotalNotification() {
    return Notification.count();
  },
};
