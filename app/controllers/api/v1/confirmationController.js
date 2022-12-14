const confirmationServices = require("../../../services/confirmationService");
const cloudinary = require("../../../../config/cloudinary");

module.exports = {
  async list(req, res) {
    confirmationServices
      .list(req.params.id)
      .then((confirmation) => {
        res.status(200).json({
          status: "OK",
          data: confirmation,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async create(req, res) {
    try {
      const fileBase64 = req.file.buffer.toString("base64");
      const file = `data:${req.file.mimetype};base64,${fileBase64}`;

      cloudinary.uploader.upload(
        file,
        { folder: "backend-files" },
        function (err, result) {
          if (!!err) {
            res.status(400).json({
              status: "Upload Fail",
              errors: err.message,
            });
            return;
          }

          const body = {
            file_url: result.url,
          };

          confirmationServices
            .create(body)
            .then(() => {
              res.status(201).json({
                status: "Created",
              });
            })
            .catch((err) => {
              res.status(422).json({
                status: "FAIL",
                message: err.message,
              });
            });
        }
      );
    } catch (error) {
      res.status(422).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },

  async update(req, res) {
    const body = await confirmationServices.findByPk(req.params.id);
    const oldimage = body.dataValues.file_url;

    if (oldimage !== null) {
      const getImageID = oldimage.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`backend-files/${getImageID}`);
    }

    const fileBase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;

    cloudinary.uploader.upload(
      file,
      { folder: "backend-files" },
      function (err, result) {
        if (!!err) {
          res.status(400).json({
            status: "Update Failed",
            errors: err.message,
          });
          return;
        }

        const payload = {
          file_url: result.url,
        };

        confirmationServices
          .update(req.params.id, payload)
          .then(() => {
            res.status(200).json({
              status: "updated",
            });
          })
          .catch((err) => {
            res.status(422).json({
              status: "FAIL",
              message: err.message,
            });
          });
      }
    );
  },

  async destroy(req, res) {
    const body = await confirmationServices.findByPk(req.params.id);
    const oldimage = body.dataValues.file_url;
    const getImageID = oldimage.split("/").pop().split(".")[0];

    await cloudinary.uploader.destroy(`backend-files/${getImageID}`);

    cloudinary.uploader.destroy(
      { folder: "backend-files" },
      function (err, result) {
        if (!!err) {
          res.status(400).json({
            status: "Failed to delete",
            errors: err.message,
          });
          return;
        }

        confirmationServices
          .destroy(req.params.id)
          .then(() => {
            res.status(200).json({
              status: "Deleted",
            });
          })
          .catch((err) => {
            res.status(422).json({
              status: "FAIL",
              message: err.message,
            });
          });
      }
    );
  },
};
