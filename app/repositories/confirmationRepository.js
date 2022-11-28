const { Receipt }  = require("../models");

module.exports = {

  create(createArgs) {
    return Receipt.create(createArgs);
  },

  update(id, updateArgs) {
    return Receipt.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  delete(id) {
    return Receipt.destroy(id);
  },

  findByPk(id) {
    return Receipt.findByPk(id);
  },

  findOne(id) {
    return Receipt.findOne(id);
  },

  findAll() {
    return Receipt.findAll();
  },

  getTotalReceipt() {
    return Receipt.count();
  },
};
