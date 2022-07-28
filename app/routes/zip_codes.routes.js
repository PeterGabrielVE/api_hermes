module.exports = app => {
    const zip_codes = require("../controllers/zip_code.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", zip_codes.create);
  
    router.get("/getAll", zip_codes.findAll);
  
    router.get("/published", zip_codes.findAllPublished);
  
    router.get("/:id", zip_codes.findOne);
  
    router.put("/:id", zip_codes.update);
  
    router.delete("/:id", zip_codes.delete);
  
    router.delete("/", zip_codes.deleteAll);
  
    app.use('/api/zip_codes', router);
  };
  