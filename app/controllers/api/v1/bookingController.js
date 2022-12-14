const bookingService = require("../../../services/bookingService");

module.exports = {
  list(req, res) {
    bookingService
      .list()
      .then(({ data, count }) => {
        res.status(200).json({
          status: "OK",
          data: { booking: data },
          meta: { total: count },
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  create(req, res) {
    const id_flight = req.body.id_flight;
    const id_user = req.user.id
    const seat = req.body.seat;
    const name = req.body.name;
    const homephone = req.body.homephone;
    const mobilephone = req.body.mobilephone;
    const totalprice = req.body.totalprice;
    const booking_date = req.body.booking_date;
    bookingService
      .create({
        id_flight,
        id_user,
        seat,
        name,
        homephone,
        mobilephone,
        totalprice,
        booking_date,
      })
      .then((post) => {
        res.status(201).json({
          status: "Create Booking successfully",
          data: post,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  update(req, res) {
    bookingService
      .update(req.params.id, {
        id_booking: req.body.id_booking,
        id_user: req.user.id_user,
        seat: req.body.seat,
        name: req.body.name,
        homephone: req.body.homephone,
        mobilephone: req.body.mobilephone,
        totalprice: req.body.totalprice,
        booking_date: req.body.booking_date
      })
      .then(() => {
        res.status(200).json({
          status: "Update Booking successfully",
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  show(req, res) {
    bookingService
      .findByPk(req.params.id)
      .then((post) => {
        res.status(200).json({
          status: "OK",
          data: post,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  destroy(req, res) {
    bookingService
      .destroy(req.params.id)
      .then(() => {
        res.status(200).json({
          status: `Delete Booking successfully`,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },
};
