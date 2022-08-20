module.exports = app => {
    const services_types = require("../controllers/services_type.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", services_types.create);
  
    router.get("/getAll", services_types.findAll);
  
    router.get("/published", services_types.findAllPublished);
  
    router.get("/:id", services_types.findOne);
  
    router.put("/:id", services_types.update);
  
    router.delete("/:id", services_types.delete);
  
    router.delete("/", services_types.deleteAll);
  
    app.use('/api/services_types', router);
  };
  