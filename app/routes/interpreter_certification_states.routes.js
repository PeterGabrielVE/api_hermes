module.exports = app => {
  const interpreter_certification_states = require("../controllers/interpreter_certification_state.controller.js");

  var router = require("express").Router();

  router.post("/", interpreter_certification_states.create);

  router.get("/getAll", interpreter_certification_states.findAll);

  router.get("/published", interpreter_certification_states.findAllPublished);

  router.get("/:id", interpreter_certification_states.findOne);

  router.put("/:id", interpreter_certification_states.update);

  router.delete("/:id", interpreter_certification_states.delete);

  router.delete("/", interpreter_certification_states.deleteAll);

  app.use('/api/interpreter_certification_states', router);
};

  