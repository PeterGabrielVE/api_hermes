module.exports = app => {
    const job_orders = require("../controllers/job_order.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", job_orders.create);
  
    router.get("/getAll", job_orders.findAll);
  
    router.get("/published", job_orders.findAllPublished);
  
    router.get("/:id", job_orders.findOne);
  
    router.put("/:id", job_orders.update);
  
    router.delete("/:id", job_orders.delete);
  
    router.delete("/", job_orders.deleteAll);
  
    app.use('/api/job_orders', router);
  };
  