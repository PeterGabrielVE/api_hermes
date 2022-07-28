module.exports = app => {
    const password_resets = require("../controllers/password_reset.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", password_resets.create);
  
    router.get("/getAll", password_resets.findAll);
  
    router.get("/published", password_resets.findAllPublished);
  
    router.get("/:id", password_resets.findOne);
  
    router.put("/:id", password_resets.update);
  
    router.delete("/:id", password_resets.delete);
  
    router.delete("/", password_resets.deleteAll);
  
    app.use('/api/password_resets', router);
  };
  