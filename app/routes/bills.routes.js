module.exports = app => {
    const bills = require("../controllers/bill.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Invoice
    router.post("/", bills.create);
  
    // Retrieve all bills
    router.get("/getAll", bills.findAll);
  
    // Retrieve all published bills
    router.get("/published", bills.findAllPublished);
  
    // Retrieve a single Invoice with id
    router.get("/:id", bills.findOne);
  
    // Update a Invoice with id
    router.put("/:id", bills.update);
  
    // Delete a Invoice with id
    router.delete("/:id", bills.delete);
  
    // Delete all bills
    router.delete("/", bills.deleteAll);
  
    app.use('/api/bills', router);
  };
  