module.exports = app => {
    const intepreters_contacts = require("../controllers/intepreters_contact.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", intepreters_contacts.create);
  
    router.get("/getAll", intepreters_contacts.findAll);
  
    router.get("/published", intepreters_contacts.findAllPublished);
  
    router.get("/:id", intepreters_contacts.findOne);
  
    router.put("/:id", intepreters_contacts.update);
  
    router.delete("/:id", intepreters_contacts.delete);
  
    router.delete("/", intepreters_contacts.deleteAll);
  
    app.use('/api/intepreters_contacts', router);
  };
  