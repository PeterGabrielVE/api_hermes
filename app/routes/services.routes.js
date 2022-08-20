module.exports = app => {
    const services = require("../controllers/service.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", services.create);
  
    router.get("/getAll", services.findAll);
  
    router.get("/published", services.findAllPublished);
  
    router.get("/:id", services.findOne);
  
    router.put("/:id", services.update);
  
    router.delete("/:id", services.delete);
  
    router.delete("/", services.deleteAll);
  
    app.use('/api/services', router);
  };
  