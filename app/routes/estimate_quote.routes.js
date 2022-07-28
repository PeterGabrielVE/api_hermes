module.exports = app => {
    const estimate_quote = require("../controllers/estimate_quot.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", estimate_quote.create);
  
    router.get("/getAll", estimate_quote.findAll);
  
    router.get("/published", estimate_quote.findAllPublished);
  
    router.get("/:id", estimate_quote.findOne);
  
    router.put("/:id", estimate_quote.update);
  
    router.delete("/:id", estimate_quote.delete);
  
    router.delete("/", estimate_quote.deleteAll);
  
    app.use('/api/estimate_quote', router);
  };
  