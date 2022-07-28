module.exports = app => {
    const services_requests_status = require("../controllers/services_requests_statu.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", services_requests_status.create);
  
    router.get("/getAll", services_requests_status.findAll);
  
    router.get("/published", services_requests_status.findAllPublished);
  
    router.get("/:id", services_requests_status.findOne);
  
    router.put("/:id", services_requests_status.update);
  
    router.delete("/:id", services_requests_status.delete);
  
    router.delete("/", services_requests_status.deleteAll);
  
    app.use('/api/services_requests_status', router);
  };
  