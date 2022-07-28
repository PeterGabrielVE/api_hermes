module.exports = app => {
    const service_estimate_job = require("../controllers/service_estimate_jo.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", service_estimate_job.create);
  
    router.get("/getAll", service_estimate_job.findAll);
  
    router.get("/published", service_estimate_job.findAllPublished);
  
    router.get("/:id", service_estimate_job.findOne);
  
    router.put("/:id", service_estimate_job.update);
  
    router.delete("/:id", service_estimate_job.delete);
  
    router.delete("/", service_estimate_job.deleteAll);
  
    app.use('/api/service_estimate_job', router);
  };
  