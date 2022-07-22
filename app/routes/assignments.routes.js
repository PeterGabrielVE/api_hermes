module.exports = app => {
    const assignments = require("../controllers/assignment.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Invoice
    router.post("/", assignments.create);
  
    // Retrieve all assignments
    router.get("/getAll", assignments.findAll);
  
    // Retrieve all published assignments
    router.get("/published", assignments.findAllPublished);
  
    // Retrieve a single Invoice with id
    router.get("/:id", assignments.findOne);
  
    // Update a Invoice with id
    router.put("/:id", assignments.update);
  
    // Delete a Invoice with id
    router.delete("/:id", assignments.delete);
  
    // Delete all assignments
    router.delete("/", assignments.deleteAll);
  
    app.use('/api/assignments', router);
  };