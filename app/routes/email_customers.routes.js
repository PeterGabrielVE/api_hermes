module.exports = app => {
    const email_customers = require("../controllers/email_customer.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", email_customers.create);
  
    router.get("/getAll", email_customers.findAll);
  
    router.get("/published", email_customers.findAllPublished);
  
    router.get("/:id", email_customers.findOne);
  
    router.put("/:id", email_customers.update);
  
    router.delete("/:id", email_customers.delete);
  
    router.delete("/", email_customers.deleteAll);
  
    app.use('/api/email_customers', router);
  };
  