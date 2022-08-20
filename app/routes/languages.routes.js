module.exports = app => {
    const languages = require("../controllers/language.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", languages.create);
  
    router.get("/getAll", languages.findAll);
  
    router.get("/published", languages.findAllPublished);
  
    router.get("/:id", languages.findOne);
  
    router.put("/:id", languages.update);
  
    router.delete("/:id", languages.delete);
  
    router.delete("/", languages.deleteAll);
  
    app.use('/api/languages', router);
  };
  