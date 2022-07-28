module.exports = app => {
    const permissions = require("../controllers/permission.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", permissions.create);
  
    router.get("/getAll", permissions.findAll);
  
    router.get("/published", permissions.findAllPublished);
  
    router.get("/:id", permissions.findOne);
  
    router.put("/:id", permissions.update);
  
    router.delete("/:id", permissions.delete);
  
    router.delete("/", permissions.deleteAll);
  
    app.use('/api/permissions', router);
  };
  