module.exports = app => {
    const history_logs = require("../controllers/history_log.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", history_logs.create);
  
    router.get("/getAll", history_logs.findAll);
  
    router.get("/published", history_logs.findAllPublished);
  
    router.get("/:id", history_logs.findOne);
  
    router.put("/:id", history_logs.update);
  
    router.delete("/:id", history_logs.delete);
  
    router.delete("/", history_logs.deleteAll);
  
    app.use('/api/history_logs', router);
  };
  