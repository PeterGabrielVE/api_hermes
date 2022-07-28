module.exports = app => {
    const receive_payments = require("../controllers/receive_payment.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", receive_payments.create);
  
    router.get("/getAll", receive_payments.findAll);
  
    router.get("/published", receive_payments.findAllPublished);
  
    router.get("/:id", receive_payments.findOne);
  
    router.put("/:id", receive_payments.update);
  
    router.delete("/:id", receive_payments.delete);
  
    router.delete("/", receive_payments.deleteAll);
  
    app.use('/api/receive_payments', router);
  };
  