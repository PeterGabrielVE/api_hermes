module.exports = app => {
    const invoices_outcomes = require("../controllers/invoices_outcome.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", invoices_outcomes.create);
  
    router.get("/getAll", invoices_outcomes.findAll);
  
    router.get("/published", invoices_outcomes.findAllPublished);
  
    router.get("/:id", invoices_outcomes.findOne);
  
    router.put("/:id", invoices_outcomes.update);
  
    router.delete("/:id", invoices_outcomes.delete);
  
    router.delete("/", invoices_outcomes.deleteAll);
  
    app.use('/api/invoices_outcomes', router);
  };
  