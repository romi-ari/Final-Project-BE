const { Flight }  = require("../models");

module.exports = {

  create(createArgs) {
    return Flight.create(createArgs);
  },

  update(id, updateArgs) {
    return Flight.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  destroy(id) {
    return Flight.destroy({  
        where: {id: id},
        });
  },

  findByPk(id) {
    return Flight.findByPk(id);
  },

  findOne(id) {
    return Flight.findOne(id);
  },

  findAll() {
    return Flight.findAll({include: [{all:true, nested:true}]});
  },

  getTotalFlight() {
    return Flight.count();
  },
};
