module.exports = app => {
    const interpreter_training = require("../controllers/interpreter_trainin.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", interpreter_training.create);
  
    router.get("/getAll", interpreter_training.findAll);
  
    router.get("/published", interpreter_training.findAllPublished);
  
    router.get("/:id", interpreter_training.findOne);
  
    router.put("/:id", interpreter_training.update);
  
    router.delete("/:id", interpreter_training.delete);
  
    router.delete("/", interpreter_training.deleteAll);
  
    app.use('/api/interpreter_training', router);
  };
  