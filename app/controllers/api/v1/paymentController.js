const userServices = require("../../../services/userServices")
const cloudinary = require("../../../../config/cloudinary")

module.exports = {
    async create(req, res){
        const fileBase64 = req.file.buffer.toString("base64")
        const file = `data:${req.file.mimetype};base64,${fileBase64}`
        
        cloudinary.uploader.upload(file, { folder: 'backend-files' }, function (err, result) {
            if (!!err) {
                res.status(400).json({
                    status: "Upload Fail",
                    errors: err.message
                })
                return
            }

            const body = {
                ...req.body,
                file_url: result.url
            }

            userServices.create(body)
                .then(() => {
                    res.status(201).json({
                        status: "Created"
                    })
                })
                .catch((err) => {
                    res.status(422).json({
                        status: "FAIL",
                        message: err.message
                    })
                })
        })
    }
    // create(req, res) {
        
    //     const file_url= req.body.file_url
    //     airportService.create({
    //         name,
    //         province,
    //         city,
    //         country,
    //         status,
    //     })
    //     .then((post) => {
    //         res.status(201).json({
    //         status: "Create Airport successfully",
    //         data: post,
    //         });
    //     })
    //     .catch((err) => {
    //         res.status(422).json({
    //         status: "FAIL",
    //         message: err.message,
    //         });
    //     });
    // },
}