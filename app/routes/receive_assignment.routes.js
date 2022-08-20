module.exports = app => {
    const receive_assignment = require("../controllers/receive_assignmen.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", receive_assignment.create);
  
    router.get("/getAll", receive_assignment.findAll);
  
    router.get("/published", receive_assignment.findAllPublished);
  
    router.get("/:id", receive_assignment.findOne);
  
    router.put("/:id", receive_assignment.update);
  
    router.delete("/:id", receive_assignment.delete);
  
    router.delete("/", receive_assignment.deleteAll);
  
    app.use('/api/receive_assignment', router);
  };
  