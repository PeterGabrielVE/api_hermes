module.exports = app => {
    const certifications
   = require("../controllers/certification.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Invoice
    router.post("/", certifications
  .create);
  
    // Retrieve all certifications
  
    router.get("/getAll", certifications
  .findAll);
  
    // Retrieve all published certifications
  
    router.get("/published", certifications
  .findAllPublished);
  
    // Retrieve a single Invoice with id
    router.get("/:id", certifications
  .findOne);
  
    // Update a Invoice with id
    router.put("/:id", certifications
  .update);
  
    // Delete a Invoice with id
    router.delete("/:id", certifications
  .delete);
  
    // Delete all certifications
  
    router.delete("/", certifications
  .deleteAll);
  
    app.use('/api/certifications', router);
  };
  