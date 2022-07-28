module.exports = app => {
    const job_orders_status = require("../controllers/job_orders_statu.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", job_orders_status.create);
  
    router.get("/getAll", job_orders_status.findAll);
  
    router.get("/published", job_orders_status.findAllPublished);
  
    router.get("/:id", job_orders_status.findOne);
  
    router.put("/:id", job_orders_status.update);
  
    router.delete("/:id", job_orders_status.delete);
  
    router.delete("/", job_orders_status.deleteAll);
  
    app.use('/api/job_orders_status', router);
  };
  