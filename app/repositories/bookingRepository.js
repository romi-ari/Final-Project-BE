const { Booking }  = require("../models");

module.exports = {

  create(createArgs) {
    return Booking.create(createArgs);
  },

  update(id, updateArgs) {
    return Booking.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  destroy(id) {
    return Booking.destroy({  
        where: {id: id},
        });
  },

  findByPk(id) {
    return Booking.findByPk(id, {include: [{all:true, nested:true}]});
  },

  findOne(id) {
    return Booking.findOne(id);
  },

  findAll() {
    return Booking.findAll({include: [{all:true, nested:true}], order: ['createdAt']});
  },

  getTotalBooking() {
    return Booking.count();
  },
};
