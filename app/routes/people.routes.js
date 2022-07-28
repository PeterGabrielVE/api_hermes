module.exports = app => {
    const people = require("../controllers/peopl.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", people.create);
  
    router.get("/getAll", people.findAll);
  
    router.get("/published", people.findAllPublished);
  
    router.get("/:id", people.findOne);
  
    router.put("/:id", people.update);
  
    router.delete("/:id", people.delete);
  
    router.delete("/", people.deleteAll);
  
    app.use('/api/people', router);
  };
  