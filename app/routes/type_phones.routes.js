module.exports = app => {
    const type_phones = require("../controllers/type_phone.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", type_phones.create);
  
    router.get("/getAll", type_phones.findAll);
  
    router.get("/published", type_phones.findAllPublished);
  
    router.get("/:id", type_phones.findOne);
  
    router.put("/:id", type_phones.update);
  
    router.delete("/:id", type_phones.delete);
  
    router.delete("/", type_phones.deleteAll);
  
    app.use('/api/type_phones', router);
  };
  