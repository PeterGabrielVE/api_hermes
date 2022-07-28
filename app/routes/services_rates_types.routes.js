module.exports = app => {
    const services_rates_types = require("../controllers/services_rates_type.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", services_rates_types.create);
  
    router.get("/getAll", services_rates_types.findAll);
  
    router.get("/published", services_rates_types.findAllPublished);
  
    router.get("/:id", services_rates_types.findOne);
  
    router.put("/:id", services_rates_types.update);
  
    router.delete("/:id", services_rates_types.delete);
  
    router.delete("/", services_rates_types.deleteAll);
  
    app.use('/api/services_rates_types', router);
  };
  