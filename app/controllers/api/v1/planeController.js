const planeService = require("../../../services/planeService");

module.exports = {
  list(req, res) {
    planeService
      .list()
      .then(({ data, count }) => {
        res.status(200).json({
          status: "OK",
          data: { planes: data },
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
    const name = req.body.name;
    const code = req.body.code;
    const status = req.body.status;
    planeService
      .create({
        code,
        name,
        status,
      })
      .then((post) => {
        res.status(201).json({
          status: "Create Plane successfully",
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
    planeService
      .update(req.params.id, {
        code: req.body.code,
        name: req.body.name,
        status: req.body.status,
      })
      .then(() => {
        res.status(200).json({
          status: "Update Plane successfully",
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
    planeService
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
    planeService
      .destroy(req.params.id)
      .then(() => {
        res.status(200).json({
          status: `Delete Plane successfully`,
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
