const { Plane }  = require("../models");

module.exports = {

  create(createArgs) {
    return Plane.create(createArgs);
  },

  update(id, updateArgs) {
    return Plane.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  destroy(id) {
    return Plane.destroy({  
        where: {id: id},
        });
  },

  findByPk(id) {
    return Plane.findByPk(id);
  },

  findOne(id) {
    return Plane.findOne(id);
  },

  findAll() {
    return Plane.findAll();
  },

  getTotalPlane() {
    return Plane.count();
  },
};
