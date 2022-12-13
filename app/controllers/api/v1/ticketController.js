const ticketService = require("../../../services/ticketService");

module.exports = {
  list(req, res) {
    ticketService
      .list()
      .then(({ data, count }) => {
        res.status(200).json({
          status: "OK",
          data: { ticket: data },
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
    const id_booking = req.body.id_booking;
    const price = req.body.price;
    const date = req.body.date;
    const dates = req.body.dates;
    ticketService
      .create({
        id_booking,
        price,
        date,
        dates,
      })
      .then((post) => {
        res.status(201).json({
          status: "Create Ticket successfully",
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
    ticketService
      .update(req.params.id, {
        id_booking: req.body.id_booking,
        price: req.body.price,
        date: req.body.date,
        dates: req.body.dates,
      })
      .then(() => {
        res.status(200).json({
          status: "Update Ticket successfully",
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
    ticketService
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
    ticketService
      .destroy(req.params.id)
      .then(() => {
        res.status(200).json({
          status: `Delete Ticket successfully`,
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
