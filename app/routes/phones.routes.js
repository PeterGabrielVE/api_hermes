module.exports = app => {
    const phones = require("../controllers/phone.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", phones.create);
  
    router.get("/getAll", phones.findAll);
  
    router.get("/published", phones.findAllPublished);
  
    router.get("/:id", phones.findOne);
  
    router.put("/:id", phones.update);
  
    router.delete("/:id", phones.delete);
  
    router.delete("/", phones.deleteAll);
  
    app.use('/api/phones', router);
  };
  