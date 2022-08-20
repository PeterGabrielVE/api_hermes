module.exports = app => {
    const contractors
   = require("../controllers/contractor.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", contractors
  .create);
  
    router.get("/getAll", contractors
  .findAll);
  
    router.get("/published", contractors
  .findAllPublished);
  
    router.get("/:id", contractors
  .findOne);
  
    router.put("/:id", contractors
  .update);
  
    router.delete("/:id", contractors
  .delete);
  
    router.delete("/", contractors
  .deleteAll);
  
    app.use('/api/contractors', router);
  };
  