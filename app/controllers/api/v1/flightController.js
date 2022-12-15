class flightController {
  constructor(flightService) {
    this.flightService = flightService;
  }

  list = async (req, res) => {
    try {
      const listFlight = await this.flightService.list();
      res.status(200).json({
        status: "OK",
        data: { flights: listFlight },
        meta: { count: listFlight.length },
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
      const flight = await this.flightService.findByPk(req.params.id);

      if (!flight) {
        res.status(404).json({ message: "id flight tidak ditemukan" });
        return;
      }
      res.status(200).json({
        status: "OK",
        data: flight,
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
      const id_plane = req.body.id_plane;
      const from_airport_id = req.body.from_airport_id;
      const to_airport_id = req.body.to_airport_id;
      const kelas = req.body.kelas;
      const available_seats = req.body.available_seats;
      const price = req.body.price;
      const arrival_time = req.body.arrival_time;
      const departure_time = req.body.departure_time;
      const flight_date = req.body.flight_date;
      const flight = await this.flightService.create({
        from_airport_id,
        to_airport_id,
        id_plane,
        kelas,
        available_seats,
        price,
        arrival_time,
        departure_time,
        flight_date,
      });
      res.status(201).json({
        status: "Create flight successfully",
        data: flight,
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
      const flight = await this.flightService.update(req.params.id, {
        id_plane: req.body.id_plane,
        from_airport_id: req.body.from_airport_id,
        to_airport_id: req.body.to_airport_id,
        kelas: req.body.kelas,
        available_seats: req.body.available_seats,
        price: req.body.price,
        arrival_time: req.body.arrival_time,
        departure_time: req.body.departure_time,
        flight_date: req.body.flight_date,
      });
      if (flight == 0) {
        res.status(404).json({ message: "id flight tidak ditemukan" });
        return;
      }
      res.status(200).json({
        status: "Update flight successfully",
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
      const flight = await this.flightService.destroy(req.params.id);

      if (!flight) {
        res.status(404).json({ message: "id flight tidak ditemukan" });
        return;
      }
      res.status(200).json({
        status: "SUCCESS",
        status: `Delete flight successfully`,
      });
    } catch (error) {
      res.status(400).json({
        status: "FAIL",
        message: error.message,
      });
    }
  };
}

module.exports = flightController;
