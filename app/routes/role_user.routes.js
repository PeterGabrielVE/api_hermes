module.exports = app => {
    const role_user = require("../controllers/role_use.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", role_user.create);
  
    router.get("/getAll", role_user.findAll);
  
    router.get("/published", role_user.findAllPublished);
  
    router.get("/:id", role_user.findOne);
  
    router.put("/:id", role_user.update);
  
    router.delete("/:id", role_user.delete);
  
    router.delete("/", role_user.deleteAll);
  
    app.use('/api/role_user', router);
  };
  