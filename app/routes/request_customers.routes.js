module.exports = app => {
    const request_customers = require("../controllers/request_customer.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", request_customers.create);
  
    router.get("/getAll", request_customers.findAll);
  
    router.get("/published", request_customers.findAllPublished);
  
    router.get("/:id", request_customers.findOne);
  
    router.put("/:id", request_customers.update);
  
    router.delete("/:id", request_customers.delete);
  
    router.delete("/", request_customers.deleteAll);
  
    app.use('/api/request_customers', router);
  };
  