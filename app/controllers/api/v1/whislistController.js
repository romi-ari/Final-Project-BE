class whislistController {
  constructor(whislistService) {
    this.whislistService = whislistService;
  }

  list = async (req, res) => {
    try {
      const listWhislist = await this.whislistService.list();
      res.status(200).json({
        status: "OK",
        data: { whislists: listWhislist },
        meta: { count: listWhislist.length },
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
      const whislist = await this.whislistService.findByPk(req.params.id);

      if (!whislist) {
        res.status(404).json({ message: "id whislist tidak ditemukan" });
        return;
      }
      res.status(200).json({
        status: "OK",
        data: whislist,
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
      const id_flight = req.body.id_flight;
      const id_user = req.user.id;
      const whislist = await this.whislistService.create({
        id_flight,
        id_user,
      });
      res.status(201).json({
        status: "Create whislist successfully",
        data: whislist,
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
      const whislist = await this.whislistService.update(req.params.id, {
        id_user: req.user.id_user,
        id_flight: req.body.id_flight
      });
      if (whislist == 0) {
        res.status(404).json({ message: "id whislist tidak ditemukan" });
        return;
      }
      res.status(200).json({
        status: "Update whislist successfully",
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
      const whislist = await this.whislistService.destroy(req.params.id);

      if (!whislist) {
        res.status(404).json({ message: "id whislist tidak ditemukan" });
        return;
      }
      res.status(200).json({
        status: "SUCCESS",
        status: `Delete whislist successfully`,
      });
    } catch (error) {
      res.status(400).json({
        status: "FAIL",
        message: error.message,
      });
    }
  };
}

module.exports = whislistController;
