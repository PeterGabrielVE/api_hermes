module.exports = app => {
    const interpreters_network = require("../controllers/interpreters_networ.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", interpreters_network.create);
  
    router.get("/getAll", interpreters_network.findAll);
  
    router.get("/published", interpreters_network.findAllPublished);
  
    router.get("/:id", interpreters_network.findOne);
  
    router.put("/:id", interpreters_network.update);
  
    router.delete("/:id", interpreters_network.delete);
  
    router.delete("/", interpreters_network.deleteAll);
  
    app.use('/api/interpreters_network', router);
  };
  