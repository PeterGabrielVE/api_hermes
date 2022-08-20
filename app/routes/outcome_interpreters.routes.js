module.exports = app => {
    const outcome_interpreters = require("../controllers/outcome_interpreter.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", outcome_interpreters.create);
  
    router.get("/getAll", outcome_interpreters.findAll);
  
    router.get("/published", outcome_interpreters.findAllPublished);
  
    router.get("/:id", outcome_interpreters.findOne);
  
    router.put("/:id", outcome_interpreters.update);
  
    router.delete("/:id", outcome_interpreters.delete);
  
    router.delete("/", outcome_interpreters.deleteAll);
  
    app.use('/api/outcome_interpreters', router);
  };
  