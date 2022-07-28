module.exports = app => {
    const jobs = require("../controllers/job.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", jobs.create);
  
    router.get("/getAll", jobs.findAll);
  
    router.get("/published", jobs.findAllPublished);
  
    router.get("/:id", jobs.findOne);
  
    router.put("/:id", jobs.update);
  
    router.delete("/:id", jobs.delete);
  
    router.delete("/", jobs.deleteAll);
  
    app.use('/api/jobs', router);
  };
  