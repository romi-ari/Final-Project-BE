class airportController {
  constructor(airportService) {
    this.airportService = airportService;
  }

  list = async (req, res) => {
    try {
      const listAirport = await this.airportService.list();
      res.status(200).json({
        status: "OK",
        data: { airports: listAirport },
        meta: { count: listAirport.length },
      });
    } catch (error) {
      res.status(400).json({
        status: "FAIL",
        message: error.message,
      });
    }
  };

  showById = async (req, res) => {
    try {
      const airport = await this.airportService.findByPk(req.params.id);

      if (!airport) {
        res.status(404).json({ message: "id airport tidak ditemukan" });
        return;
      }
      res.status(200).json({
        status: "OK",
        data: airport,
      });
    } catch (error) {
      res.status(400).json({
        status: "FAIL",
        message: error.message,
      });
    }
  };

  create = async (req, res) => {
    try {
      const name = req.body.name;
      const province = req.body.province;
      const city = req.body.city;
      const country = req.body.country;
      const code = req.body.code;
      const status = req.body.status;
      const airport = await this.airportService.create({
        name,
        province,
        city,
        country,
        code,
        status,
      });
      res.status(201).json({
        status: "Create Airport successfully",
        data: airport,
      });
    } catch (error) {
      res.status(400).json({
        status: "FAIL",
        message: error.message,
      });
    }
  };

  update = async (req, res) => {
    try {
      const airport = await this.airportService.update(req.params.id, {
        name: req.body.name,
        province: req.body.province,
        city: req.body.city,
        country: req.body.country,
        code: req.body.code,
        status: req.body.status,
      });
      if (airport == 0) {
        res.status(404).json({ message: "id airport tidak ditemukan" });
        return;
      }
      res.status(200).json({
        status: "Update Airport successfully",
      });
    } catch (error) {
      res.status(400).json({
        status: "FAIL",
        message: error.message,
      });
    }
  };

  destroy = async (req, res) => {
    try {
      const airport = await this.airportService.destroy(req.params.id);

      if (!airport) {
        res.status(404).json({ message: "id airport tidak ditemukan" });
        return;
      }
      res.status(200).json({
        status: "SUCCESS",
        status: `Delete Airport successfully`,
      });
    } catch (error) {
      res.status(400).json({
        status: "FAIL",
        message: error.message,
      });
    }
  };
}

module.exports = airportController;

// module.exports = {
//   list(req, res) {
//     airportService
//       .list()
//       .then(({ data, count }) => {
//         res.status(200).json({
//           status: "OK",
//           data: { airports: data },
//           meta: { total: count },
//         });
//       })
//       .catch((err) => {
//         res.status(400).json({
//           status: "FAIL",
//           message: err.message,
//         });
//       });
//   },

//   create(req, res) {
//     const name = req.body.name;
//     const province = req.body.province;
//     const city = req.body.city;
//     const country = req.body.country;
//     const status = req.body.status;
//     airportService
//       .create({
//         name,
//         province,
//         city,
//         country,
//         status,
//       })
//       .then((post) => {
//         res.status(201).json({
//           status: "Create Airport successfully",
//           data: post,
//         });
//       })
//       .catch((err) => {
//         res.status(422).json({
//           status: "FAIL",
//           message: err.message,
//         });
//       });
//   },

//   update(req, res) {
//     airportService
//       .update(req.params.id, {
//         name: req.body.name,
//         province: req.body.province,
//         city: req.body.city,
//         country: req.body.country,
//         status: req.body.status,
//       })
//       .then(() => {
//         res.status(200).json({
//           status: "Update Airport successfully",
//         });
//       })
//       .catch((err) => {
//         res.status(422).json({
//           status: "FAIL",
//           message: err.message,
//         });
//       });
//   },

//   show(req, res) {
//     airportService
//       .findByPk(req.params.id)
//       .then((post) => {
//         res.status(200).json({
//           status: "OK",
//           data: post,
//         });
//       })
//       .catch((err) => {
//         res.status(422).json({
//           status: "FAIL",
//           message: err.message,
//         });
//       });
//   },

//   destroy(req, res) {
//     airportService
//       .destroy(req.params.id)
//       .then(() => {
//         res.status(200).json({
//           status: `Delete Airport successfully`,
//         });
//       })
//       .catch((err) => {
//         res.status(422).json({
//           status: "FAIL",
//           message: err.message,
//         });
//       });
//   },
// };
