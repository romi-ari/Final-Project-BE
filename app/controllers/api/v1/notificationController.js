class notificationController {
  constructor(notificationService) {
    this.notificationService = notificationService;
  }

  list = async (req, res) => {
    try {
      const listNotification = await this.notificationService.list();
      res.status(200).json({
        status: "OK",
        data: { notifications: listNotification },
        meta: { count: listNotification.length },
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
      const notification = await this.notificationService.findByPk(
        req.params.id
      );

      if (!notification) {
        res.status(404).json({ message: "id notification tidak ditemukan" });
        return;
      }

      res.status(200).json({
        status: "OK",
        data: notification,
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
      const message = req.body.message;
      const id_user = req.body.id;
      const notification = await this.notificationService.create({
        message,
        id_user,
      });
      res.status(201).json({
        status: "Create notification successfully",
        data: notification,
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
      const notification = await this.notificationService.update(
        req.params.id,
        {
          message: req.body.message,
          id_user: req.body.id,
        }
      );
      if (notification == 0) {
        res.status(404).json({ message: "id notification tidak ditemukan" });
        return;
      }
      res.status(200).json({
        status: "Update notification successfully",
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
      const notification = await this.notificationService.destroy(
        req.params.id
      );

      if (!notification) {
        res.status(404).json({ message: "id notification tidak ditemukan" });
        return;
      }
      res.status(200).json({
        status: "SUCCESS",
        status: `Delete notification successfully`,
      });
    } catch (error) {
      res.status(400).json({
        status: "FAIL",
        message: error.message,
      });
    }
  };
}
module.exports = notificationController;
