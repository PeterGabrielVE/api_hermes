module.exports = app => {
    const interpreters = require("../controllers/interpreter.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", interpreters.create);
  
    router.get("/getAll", interpreters.findAll);
  
    router.get("/published", interpreters.findAllPublished);
  
    router.get("/:id", interpreters.findOne);
  
    router.put("/:id", interpreters.update);
  
    router.delete("/:id", interpreters.delete);
  
    router.delete("/", interpreters.deleteAll);
  
    app.use('/api/interpreters', router);
  };