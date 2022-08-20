module.exports = app => {
    const receive_payment_invoice = require("../controllers/receive_payment_invoic.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", receive_payment_invoice.create);
  
    router.get("/getAll", receive_payment_invoice.findAll);
  
    router.get("/published", receive_payment_invoice.findAllPublished);
  
    router.get("/:id", receive_payment_invoice.findOne);
  
    router.put("/:id", receive_payment_invoice.update);
  
    router.delete("/:id", receive_payment_invoice.delete);
  
    router.delete("/", receive_payment_invoice.deleteAll);
  
    app.use('/api/receive_payment_invoice', router);
  };
  