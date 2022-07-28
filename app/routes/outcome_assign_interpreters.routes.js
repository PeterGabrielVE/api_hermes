module.exports = app => {
    const outcome_assign_interpreters = require("../controllers/outcome_assign_interpreter.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", outcome_assign_interpreters.create);
  
    router.get("/getAll", outcome_assign_interpreters.findAll);
  
    router.get("/published", outcome_assign_interpreters.findAllPublished);
  
    router.get("/:id", outcome_assign_interpreters.findOne);
  
    router.put("/:id", outcome_assign_interpreters.update);
  
    router.delete("/:id", outcome_assign_interpreters.delete);
  
    router.delete("/", outcome_assign_interpreters.deleteAll);
  
    app.use('/api/outcome_assign_interpreters', router);
  };
  