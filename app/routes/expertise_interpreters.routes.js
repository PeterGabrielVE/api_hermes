module.exports = app => {
    const expertise_interpreters = require("../controllers/expertise_interpreter.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", expertise_interpreters.create);
  
    router.get("/getAll", expertise_interpreters.findAll);
  
    router.get("/published", expertise_interpreters.findAllPublished);
  
    router.get("/:id", expertise_interpreters.findOne);
  
    router.put("/:id", expertise_interpreters.update);
  
    router.delete("/:id", expertise_interpreters.delete);
  
    router.delete("/", expertise_interpreters.deleteAll);
  
    app.use('/api/expertise_interpreters', router);
  };
  