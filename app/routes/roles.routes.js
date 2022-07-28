module.exports = app => {
    const roles = require("../controllers/role.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", roles.create);
  
    router.get("/getAll", roles.findAll);
  
    router.get("/published", roles.findAllPublished);
  
    router.get("/:id", roles.findOne);
  
    router.put("/:id", roles.update);
  
    router.delete("/:id", roles.delete);
  
    router.delete("/", roles.deleteAll);
  
    app.use('/api/roles', router);
  };
  