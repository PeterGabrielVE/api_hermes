module.exports = app => {
    const service_request_field = require("../controllers/service_request_fiel.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", service_request_field.create);
  
    router.get("/getAll", service_request_field.findAll);
  
    router.get("/published", service_request_field.findAllPublished);
  
    router.get("/:id", service_request_field.findOne);
  
    router.put("/:id", service_request_field.update);
  
    router.delete("/:id", service_request_field.delete);
  
    router.delete("/", service_request_field.deleteAll);
  
    app.use('/api/service_request_field', router);
  };
  