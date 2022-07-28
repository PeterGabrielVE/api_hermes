module.exports = app => {
    const language_service_offereds = require("../controllers/language_service_offered.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", language_service_offereds.create);
  
    router.get("/getAll", language_service_offereds.findAll);
  
    router.get("/published", language_service_offereds.findAllPublished);
  
    router.get("/:id", language_service_offereds.findOne);
  
    router.put("/:id", language_service_offereds.update);
  
    router.delete("/:id", language_service_offereds.delete);
  
    router.delete("/", language_service_offereds.deleteAll);
  
    app.use('/api/language_service_offereds', router);
  };
  