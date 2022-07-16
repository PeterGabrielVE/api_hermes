module.exports = app => {
    const invoices = require("../controllers/invoice.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Invoice
    router.post("/", invoices.create);
  
    // Retrieve all invoices
    router.get("/getAll", invoices.findAll);
  
    // Retrieve all published invoices
    router.get("/published", invoices.findAllPublished);
  
    // Retrieve a single Invoice with id
    router.get("/:id", invoices.findOne);
  
    // Update a Invoice with id
    router.put("/:id", invoices.update);
  
    // Delete a Invoice with id
    router.delete("/:id", invoices.delete);
  
    // Delete all invoices
    router.delete("/", invoices.deleteAll);
  
    app.use('/api/agencies', router);
  };
  