
 const airportService = require("../../../services/airportService");

 module.exports = {
 verifyRoles(...allowedRoles){
     return (req, res, next) =>{
         userRole = Object.values(req.user)[0].role;
         if(!userRole) return res.status(401).json({
             status: "FAIL",
             message: "you don't have role",
         });
         const rolesArray = [...allowedRoles];
         const result = rolesArray.includes(userRole);
         if(!result) return res.status(401).json({
             status: "FAIL",
             message: "you don't have permission",
         });
         next();
     }
 },
 
 list(req, res) {
     airportService
     .list()
     .then(({ data, count }) => {
         res.status(200).json({
         status: "OK",
         data: { airports: data },
         meta: { total: count },
         });
     })
     .catch((err) => {
         res.status(400).json({
         status: "FAIL",
         message: err.message,
         });
     });
 },
 
 create(req, res) {
     const name= req.body.name
     const province= req.body.province
     const city= req.body.city
     const country= req.body.country
     const status= req.body.status
     airportService.create({
         name,
         province,
         city,
         country,
         status,
     })
     .then((post) => {
         res.status(201).json({
         status: "Create Airport successfully",
         data: post,
         });
     })
     .catch((err) => {
         res.status(422).json({
         status: "FAIL",
         message: err.message,
         });
     });
 },
 
 update(req, res) {
     airportService
     .update(req.params.id, {
         name: req.body.name,
         province: req.body.province,
         city: req.body.city,
         country: req.body.country,
         status: req.body.status
     })
     .then(() => {
         res.status(200).json({
         status: "Update Airport successfully",
         });
     })
     .catch((err) => {
         res.status(422).json({
         status: "FAIL",
         message: err.message,
         });
     });
 },
 
 show(req, res) {
     airportService
     .findByPk(req.params.id)
     .then((post) => {
         res.status(200).json({
         status: "OK",
         data: post,
         });
     })
     .catch((err) => {
         res.status(422).json({
         status: "FAIL",
         message: err.message,
         });
     });
 },
 
 destroy(req, res) {
     airportService
     .destroy(req.params.id)
     .then(() => {
         res.status(200).json({
         status: `Delete Airport successfully`,
         });
     })
     .catch((err) => {
         res.status(422).json({
         status: "FAIL",
         message: err.message,
         });
     });
 },
 };
 