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
    return Booking.findByPk(id);
  },

  findOne(id) {
    return Booking.findOne(id);
  },

  findAll() {
    return Booking.findAll({include: [{all:true, nested:true}]});
  },

  getTotalBooking() {
    return Booking.count();
  },
};
