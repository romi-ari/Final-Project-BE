const { Whislist }  = require("../models");


module.exports = {

  create(createArgs) {
    return Whislist.create(createArgs);
  },

  update(id, updateArgs) {
    return Whislist.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  destroy(id) {
    return Whislist.destroy({  
        where: {id: id},
        });
  },

  findByPk(id) {
    return Whislist.findByPk(id);
  },

  findOne(id) {
    return Whislist.findOne(id);
  },

  findAll() {
    return Whislist.findAll({include: [{all:true, nested:true}]});
  },

  getTotalWhislist() {
    return Whislist.count();
  },
};
