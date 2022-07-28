module.exports = app => {
    const emails = require("../controllers/email.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", emails.create);
  
    router.get("/getAll", emails.findAll);
  
    router.get("/published", emails.findAllPublished);
  
    router.get("/:id", emails.findOne);
  
    router.put("/:id", emails.update);
  
    router.delete("/:id", emails.delete);
  
    router.delete("/", emails.deleteAll);
  
    app.use('/api/emails', router);
  };
  