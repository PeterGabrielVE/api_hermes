module.exports = app => {
    const notes_interpreters = require("../controllers/notes_interpreter.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", notes_interpreters.create);
  
    router.get("/getAll", notes_interpreters.findAll);
  
    router.get("/published", notes_interpreters.findAllPublished);
  
    router.get("/:id", notes_interpreters.findOne);
  
    router.put("/:id", notes_interpreters.update);
  
    router.delete("/:id", notes_interpreters.delete);
  
    router.delete("/", notes_interpreters.deleteAll);
  
    app.use('/api/notes_interpreters', router);
  };
  