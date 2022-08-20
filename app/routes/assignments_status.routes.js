module.exports = app => {
    const assignments_status = require("../controllers/assignments_status.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Invoice
    router.post("/", assignments_status.create);
  
    // Retrieve all assignments_status
    router.get("/getAll", assignments_status.findAll);
  
    // Retrieve all published assignments_status
    router.get("/published", assignments_status.findAllPublished);
  
    // Retrieve a single Invoice with id
    router.get("/:id", assignments_status.findOne);
  
    // Update a Invoice with id
    router.put("/:id", assignments_status.update);
  
    // Delete a  with id
    router.delete("/:id", assignments_status.delete);
  
    // Delete all assignments_status
    router.delete("/", assignments_status.deleteAll);
  
    app.use('/api/assignments_status', router);
  };