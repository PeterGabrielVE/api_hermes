module.exports = app => {
    const services_new = require("../controllers/services_ne.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", services_new.create);
  
    router.get("/getAll", services_new.findAll);
  
    router.get("/published", services_new.findAllPublished);
  
    router.get("/:id", services_new.findOne);
  
    router.put("/:id", services_new.update);
  
    router.delete("/:id", services_new.delete);
  
    router.delete("/", services_new.deleteAll);
  
    app.use('/api/services_new', router);
  };
  