module.exports = app => {
    const model_has_roles = require("../controllers/model_has_role.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", model_has_roles.create);
  
    router.get("/getAll", model_has_roles.findAll);
  
    router.get("/published", model_has_roles.findAllPublished);
  
    router.get("/:id", model_has_roles.findOne);
  
    router.put("/:id", model_has_roles.update);
  
    router.delete("/:id", model_has_roles.delete);
  
    router.delete("/", model_has_roles.deleteAll);
  
    app.use('/api/model_has_roles', router);
  };
  