class notificationController {
    constructor(notificationService) {
      this.notificationService = notificationService;
    }
  
    list = async (req, res) => {
      try {
        const notificationPlane = await this.notificationService.list();
        res.status(200).json({
          status: "OK",
          data: { planes: notificationPlane },
          meta: { count: notificationPlane.length },
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
        const notification = await this.notificationService.findByPk(req.params.id);
  
        if (!notification) {
          res.status(404).json({ message: "id notification tidak ditemukan" });
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
        const message = req.body.message;
        const id_user = req.body.id_user;
        const notification = await this.notificationService.create({
          id_user,
          message,
        });
        res.status(201).json({
          status: "Create Notification successfully",
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
        const plane = await this.notificationService.update(req.params.id, {
          message : req.body.message,
          id_user : req.body.id_user,
        });
        if (plane == 0) {
          res.status(404).json({ message: "id Notification tidak ditemukan" });
          return;
        }
        res.status(200).json({
          status: "Update Notification successfully",
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
        const Notification = await this.notificationService.destroy(req.params.id);
  
        if (!Notification) {
          res.status(404).json({ message: "id Notification tidak ditemukan" });
          return;
        }
        res.status(200).json({
          status: "SUCCESS",
          status: `Delete Notification successfully`,
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
  
  