module.exports = app => {
    const contacts_customer
   = require("../controllers/contacts_custome.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", contacts_customer
  .create);
  
    router.get("/getAll", contacts_customer
  .findAll);
  
    router.get("/published", contacts_customer
  .findAllPublished);
  
    router.get("/:id", contacts_customer
  .findOne);
  
    router.put("/:id", contacts_customer
  .update);
  
    router.delete("/:id", contacts_customer
  .delete);
  
    router.delete("/", contacts_customer
  .deleteAll);
  
    app.use('/api/contacts_customer', router);
  };
  