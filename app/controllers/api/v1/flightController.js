const flightService = require("../../../services/flightService");

module.exports = {
  list(req, res) {
    flightService
      .list({include: [{ all: true, nested: true }]})
      .then(({ data, count }) => {
        res.status(200).json({
          status: "OK",
          data: { flights: data },
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
    const id_plane = req.body.id_plane;
    const from_airport_id = req.body.from_airport_id;
    const to_airport_id = req.body.to_airport_id;
    const arrival_time = req.body.arrival_time;
    const departure_time = req.body.departure_time;
    flightService
      .create({
        from_airport_id,
        to_airport_id,
        id_plane,
        arrival_time,
        departure_time,
      })
      .then((post) => {
        res.status(201).json({
          status: "Create Flight successfully",
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
    flightService
      .update(req.params.id, {
        id_plane : req.body.id_plane,
        from_airport_id : req.body.from_airport_id,
        to_airport_id : req.body.to_airport_id,
        arrival_time : req.body.arrival_time,
        departure_time : req.body.departure_time,
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
    flightService
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
    flightService
      .destroy(req.params.id)
      .then(() => {
        res.status(200).json({
          status: `Delete Flight successfully`,
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
