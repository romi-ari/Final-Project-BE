const { Ticket }  = require("../models");


module.exports = {

  create(createArgs) {
    return Ticket.create(createArgs);
  },

  update(id, updateArgs) {
    return Ticket.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  destroy(id) {
    return Ticket.destroy({  
        where: {id: id},
        });
  },

  findByPk(id) {
    return Ticket.findByPk(id, {include: [{all:true, nested:true}]});
  },

  findOne(id) {
    return Ticket.findOne(id);
  },

  findAll() {
    return Ticket.findAll({include: [{all:true, nested:true}]});
  },

  getTotalTicket() {
    return Ticket.count();
  },
};
