class bookingController {
  constructor(bookingService) {
    this.bookingService = bookingService;
  }

  list = async (req, res) => {
    try {
      const listBooking = await this.bookingService.list();
      res.status(200).json({
        status: "OK",
        data: { bookings: listBooking },
        meta: { count: listBooking.length },
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
      const booking = await this.bookingService.findByPk(req.params.id);

      if (!booking) {
        res.status(404).json({ message: "id booking tidak ditemukan" });
        return;
      }
      res.status(200).json({
        status: "OK",
        data: booking,
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
      const seat = req.body.seat;
      const baggage = req.body.baggage;
      const food = req.body.food;
      const name = req.body.name;
      const homephone = req.body.homephone;
      const mobilephone = req.body.mobilephone;
      const totalprice = req.body.totalprice;
      const booking_date = req.body.booking_date;
      const booking = await this.bookingService.create({
        id_flight,
        id_user,
        seat,
        baggage,
        food,
        name,
        homephone,
        mobilephone,
        totalprice,
        booking_date,
      });
      res.status(201).json({
        status: "Create Booking successfully",
        data: booking,
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
      const booking = await this.bookingService.update(req.params.id, {
        id_flight : req.body.id_flight,
        id_user: req.user.id_user,
        seat: req.body.seat,
        baggage: req.body.baggage,
        food: req.body.food,
        name: req.body.name,
        homephone: req.body.homephone,
        mobilephone: req.body.mobilephone,
        totalprice: req.body.totalprice,
        booking_date: req.body.booking_date,
      });
      if (booking == 0) {
        res.status(404).json({ message: "id booking tidak ditemukan" });
        return;
      }
      res.status(200).json({
        status: "Update Booking successfully",
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
      const booking = await this.bookingService.destroy(req.params.id);

      if (!booking) {
        res.status(404).json({ message: "id booking tidak ditemukan" });
        return;
      }
      res.status(200).json({
        status: "SUCCESS",
        status: `Delete booking successfully`,
      });
    } catch (error) {
      res.status(400).json({
        status: "FAIL",
        message: error.message,
      });
    }
  };
}

module.exports = bookingController;
