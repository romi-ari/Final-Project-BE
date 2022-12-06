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
    const id_flight = req.body.id_flight;
    const price = req.body.price;
    const date = req.body.date;
    ticketService
      .create({
        id_flight,
        price,
        date,
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
        id_flight: req.body.id_flight,
        price: req.body.price,
        date: req.body.date,
      })
      .then(() => {
        res.status(200).json({
          status: "Update Flight successfully",
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
