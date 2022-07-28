module.exports = app => {
    const chat_messages
   = require("../controllers/chat_message.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Invoice
    router.post("/", chat_messages
  .create);
  
    // Retrieve all chat_messages
  
    router.get("/getAll", chat_messages
  .findAll);
  
    // Retrieve all published chat_messages
  
    router.get("/published", chat_messages
  .findAllPublished);
  
    // Retrieve a single Invoice with id
    router.get("/:id", chat_messages
  .findOne);
  
    // Update a Invoice with id
    router.put("/:id", chat_messages
  .update);
  
    // Delete a Invoice with id
    router.delete("/:id", chat_messages
  .delete);
  
    // Delete all chat_messages
  
    router.delete("/", chat_messages
  .deleteAll);
  
    app.use('/api/chat_messages', router);
  };