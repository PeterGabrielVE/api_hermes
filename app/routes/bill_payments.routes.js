module.exports = app => {
    const bill_payments = require("../controllers/bill_payment.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Invoice
    router.post("/", bill_payments.create);
  
    // Retrieve all bill_payments
    router.get("/getAll", bill_payments.findAll);
  
    // Retrieve all published bill_payments
    router.get("/published", bill_payments.findAllPublished);
  
    // Retrieve a single Invoice with id
    router.get("/:id", bill_payments.findOne);
  
    // Update a Invoice with id
    router.put("/:id", bill_payments.update);
  
    // Delete a Invoice with id
    router.delete("/:id", bill_payments.delete);
  
    // Delete all bill_payments
    router.delete("/", bill_payments.deleteAll);
  
    app.use('/api/bill_payments', router);
  };
  