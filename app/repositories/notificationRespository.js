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
    return Notification.findByPk(id, {include: [{all:true, nested:true}]});
  },

  findOne(id) {
    return Notification.findOne(id);
  },

  findAll() {
    return Notification.findAll({include: [{all:true, nested:true}]});
  },

  getTotalNotification() {
    return Notification.count();
  },
};
