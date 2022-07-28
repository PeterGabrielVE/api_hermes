module.exports = app => {
    const states = require("../controllers/state.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", states.create);
  
    router.get("/getAll", states.findAll);
  
    router.get("/published", states.findAllPublished);
  
    router.get("/:id", states.findOne);
  
    router.put("/:id", states.update);
  
    router.delete("/:id", states.delete);
  
    router.delete("/", states.deleteAll);
  
    app.use('/api/states', router);
  };
  