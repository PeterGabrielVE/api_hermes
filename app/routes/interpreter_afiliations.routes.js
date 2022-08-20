module.exports = app => {
    const interpreter_afiliations = require("../controllers/interpreter_afiliation.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", interpreter_afiliations.create);
  
    router.get("/getAll", interpreter_afiliations.findAll);
  
    router.get("/published", interpreter_afiliations.findAllPublished);
  
    router.get("/:id", interpreter_afiliations.findOne);
  
    router.put("/:id", interpreter_afiliations.update);
  
    router.delete("/:id", interpreter_afiliations.delete);
  
    router.delete("/", interpreter_afiliations.deleteAll);
  
    app.use('/api/interpreter_afiliations', router);
  };
  