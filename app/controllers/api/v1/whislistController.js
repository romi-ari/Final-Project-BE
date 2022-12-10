const whislistService = require("../../../services/whislistService");

module.exports = {
  list(req, res) {
    whislistService
      .list()
      .then(({ data, count }) => {
        res.status(200).json({
          status: "OK",
          data: { whislist: data },
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
    const id_user = req.user.id;
    const id_flight = req.body.id_flight;
    whislistService
      .create({
        id_user,
        id_flight,
      })
      .then((post) => {
        res.status(201).json({
          status: "Create Whislist successfully",
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
    whislistService
      .update(req.params.id, {
        id_user : req.user.id,
        id_flight : req.body.id_flight,
      })
      .then(() => {
        res.status(200).json({
          status: "Update Whislist successfully",
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
    whislistService
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
    whislistService
      .destroy(req.params.id)
      .then(() => {
        res.status(200).json({
          status: `Delete Whislist successfully`,
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
