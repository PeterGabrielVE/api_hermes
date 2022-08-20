module.exports = app => {
    const invoices = require("../controllers/invoice.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", invoices.create);
  
    router.get("/getAll", invoices.findAll);
  
    router.get("/published", invoices.findAllPublished);
  
    router.get("/:id", invoices.findOne);
  
    router.put("/:id", invoices.update);
  
    router.delete("/:id", invoices.delete);
  
    router.delete("/", invoices.deleteAll);
  
    app.use('/api/invoices', router);
  };
  