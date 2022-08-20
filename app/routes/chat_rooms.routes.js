module.exports = app => {
    const chat_rooms
   = require("../controllers/chat_room.controller.js");
  
    var router = require("express").Router();
    router.post("/", chat_rooms
  .create);
  
    router.get("/getAll", chat_rooms
  .findAll);
  
    router.get("/published", chat_rooms
  .findAllPublished);
  
    router.get("/:id", chat_rooms
  .findOne);
    router.put("/:id", chat_rooms
  .update);
  
    router.delete("/:id", chat_rooms
  .delete);
  
    router.delete("/", chat_rooms
  .deleteAll);
  
    app.use('/api/chat_rooms', router);
  };
  