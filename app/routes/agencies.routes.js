module.exports = app => {
    const agencies = require("../controllers/agencie.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Invoice
    router.post("/", agencies.create);
  
    // Retrieve all agencies
    router.get("/getAll", agencies.findAll);
  
    // Retrieve all published agencies
    router.get("/published", agencies.findAllPublished);
  
    // Retrieve a single Invoice with id
    router.get("/:id", agencies.findOne);
  
    // Update a Invoice with id
    router.put("/:id", agencies.update);
  
    // Delete a Invoice with id
    router.delete("/:id", agencies.delete);
  
    // Delete all agencies
    router.delete("/", agencies.deleteAll);
  
    app.use('/api/agencies', router);
  };
  