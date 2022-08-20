module.exports = app => {
    const qualification = require("../controllers/qualificatio.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", qualification.create);
  
    router.get("/getAll", qualification.findAll);
  
    router.get("/published", qualification.findAllPublished);
  
    router.get("/:id", qualification.findOne);
  
    router.put("/:id", qualification.update);
  
    router.delete("/:id", qualification.delete);
  
    router.delete("/", qualification.deleteAll);
  
    app.use('/api/qualification', router);
  };
  