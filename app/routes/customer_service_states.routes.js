module.exports = app => {
    const customer_service_states
   = require("../controllers/customer_service_state.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", customer_service_states
  .create);
  
    router.get("/getAll", customer_service_states
  .findAll);
  
    router.get("/published", customer_service_states
  .findAllPublished);
  
    router.get("/:id", customer_service_states
  .findOne);
  
    router.put("/:id", customer_service_states
  .update);
  
    router.delete("/:id", customer_service_states
  .delete);
  
    router.delete("/", customer_service_states
  .deleteAll);
  
    app.use('/api/customer_service_states', router);
  };
  