class planeController {
  constructor(planeService) {
    this.planeService = planeService;
  }

  list = async (req, res) => {
    try {
      const listPlane = await this.planeService.list();
      res.status(200).json({
        status: "OK",
        data: { planes: listPlane },
        meta: { count: listPlane.length },
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
      const plane = await this.planeService.findByPk(req.params.id);

      if (!plane) {
        res.status(404).json({ message: "id plane tidak ditemukan" });
        return;
      }
      res.status(200).json({
        status: "OK",
        data: plane,
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
      const code = req.body.code;
      const status = req.body.status;
      const plane = await this.planeService.create({
        code,
        name,
        status,
      });
      res.status(201).json({
        status: "Create plane successfully",
        data: plane,
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
      const plane = await this.planeService.update(req.params.id, {
        code: req.body.code,
        name: req.body.name,
        status: req.body.status,
      });
      if (plane == 0) {
        res.status(404).json({ message: "id plane tidak ditemukan" });
        return;
      }
      res.status(200).json({
        status: "Update plane successfully",
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
      const plane = await this.planeService.destroy(req.params.id);

      if (!plane) {
        res.status(404).json({ message: "id plane tidak ditemukan" });
        return;
      }
      res.status(200).json({
        status: "SUCCESS",
        status: `Delete plane successfully`,
      });
    } catch (error) {
      res.status(400).json({
        status: "FAIL",
        message: error.message,
      });
    }
  };
}

module.exports = planeController;
