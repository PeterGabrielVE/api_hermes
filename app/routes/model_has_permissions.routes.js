module.exports = app => {
    const model_has_permissions = require("../controllers/model_has_permission.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", model_has_permissions.create);
  
    router.get("/getAll", model_has_permissions.findAll);
  
    router.get("/published", model_has_permissions.findAllPublished);
  
    router.get("/:id", model_has_permissions.findOne);
  
    router.put("/:id", model_has_permissions.update);
  
    router.delete("/:id", model_has_permissions.delete);
  
    router.delete("/", model_has_permissions.deleteAll);
  
    app.use('/api/model_has_permissions', router);
  };
  