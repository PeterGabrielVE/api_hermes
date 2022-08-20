module.exports = app => {
    const interpreters_dbas = require("../controllers/interpreters_dba.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", interpreters_dbas.create);
  
    router.get("/getAll", interpreters_dbas.findAll);
  
    router.get("/published", interpreters_dbas.findAllPublished);
  
    router.get("/:id", interpreters_dbas.findOne);
  
    router.put("/:id", interpreters_dbas.update);
  
    router.delete("/:id", interpreters_dbas.delete);
  
    router.delete("/", interpreters_dbas.deleteAll);
  
    app.use('/api/interpreters_dbas', router);
  };
  