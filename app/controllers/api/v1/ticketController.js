class ticketController {
  constructor(ticketService) {
    this.ticketService = ticketService;
  }

  list = async (req, res) => {
    try {
      const listTicket = await this.ticketService.list();
      res.status(200).json({
        status: "OK",
        data: { tickets: listTicket },
        meta: { count: listTicket.length },
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
      const ticket = await this.ticketService.findByPk(req.params.id);

      if (!ticket) {
        res.status(404).json({ message: "id ticket tidak ditemukan" });
        return;
      }
      res.status(200).json({
        status: "OK",
        data: ticket,
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
      const id_booking = req.body.id_booking;
      const ticket = await this.ticketService.create({
        id_booking
      });
      res.status(201).json({
        status: "Create ticket successfully",
        data: ticket,
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
      const ticket = await this.ticketService.update(req.params.id, {
        id_booking: req.body.id_booking
      });
      if (ticket == 0) {
        res.status(404).json({ message: "id ticket tidak ditemukan" });
        return;
      }
      res.status(200).json({
        status: "Update ticket successfully",
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
      const ticket = await this.ticketService.destroy(req.params.id);

      if (!ticket) {
        res.status(404).json({ message: "id ticket tidak ditemukan" });
        return;
      }
      res.status(200).json({
        status: "SUCCESS",
        status: `Delete ticket successfully`,
      });
    } catch (error) {
      res.status(400).json({
        status: "FAIL",
        message: error.message,
      });
    }
  };
}

module.exports = ticketController;
