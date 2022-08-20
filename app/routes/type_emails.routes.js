module.exports = app => {
    const type_emails = require("../controllers/type_email.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", type_emails.create);
  
    router.get("/getAll", type_emails.findAll);
  
    router.get("/published", type_emails.findAllPublished);
  
    router.get("/:id", type_emails.findOne);
  
    router.put("/:id", type_emails.update);
  
    router.delete("/:id", type_emails.delete);
  
    router.delete("/", type_emails.deleteAll);
  
    app.use('/api/type_emails', router);
  };
  