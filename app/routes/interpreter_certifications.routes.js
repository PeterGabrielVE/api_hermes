module.exports = app => {
    const interpreter_certifications = require("../controllers/interpreter_certification.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", interpreter_certifications.create);
  
    router.get("/getAll", interpreter_certifications.findAll);
  
    router.get("/published", interpreter_certifications.findAllPublished);
  
    router.get("/:id", interpreter_certifications.findOne);
  
    router.put("/:id", interpreter_certifications.update);
  
    router.delete("/:id", interpreter_certifications.delete);
  
    router.delete("/", interpreter_certifications.deleteAll);
  
    app.use('/api/interpreter_certifications', router);
  };
  