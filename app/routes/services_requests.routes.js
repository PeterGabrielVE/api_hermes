module.exports = app => {
    const services_requests = require("../controllers/services_request.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", services_requests.create);
  
    router.get("/getAll", services_requests.findAll);
  
    router.get("/published", services_requests.findAllPublished);
  
    router.get("/:id", services_requests.findOne);
  
    router.put("/:id", services_requests.update);
  
    router.delete("/:id", services_requests.delete);
  
    router.delete("/", services_requests.deleteAll);
  
    app.use('/api/services_requests', router);
  };
  