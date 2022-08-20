module.exports = app => {
    const service_offereds = require("../controllers/service_offered.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", service_offereds.create);
  
    router.get("/getAll", service_offereds.findAll);
  
    router.get("/published", service_offereds.findAllPublished);
  
    router.get("/:id", service_offereds.findOne);
  
    router.put("/:id", service_offereds.update);
  
    router.delete("/:id", service_offereds.delete);
  
    router.delete("/", service_offereds.deleteAll);
  
    app.use('/api/service_offereds', router);
  };
  