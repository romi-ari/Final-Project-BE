const { Airport }  = require("../models");

module.exports = {

  create(createArgs) {
    return Airport.create(createArgs);
  },

  update(id, updateArgs) {
    return Airport.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  destroy(id) {
    return Airport.destroy({  
        where: {id: id},
        });
  },

  findByPk(id) {
    return Airport.findByPk(id);
  },

  findOne(id) {
    return Airport.findOne(id);
  },

  findAll() {
    return Airport.findAll();
  },

  getTotalAirport() {
    return Airport.count();
  },
};
