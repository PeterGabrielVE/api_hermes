const Interpreter_certification_state = require("../models/interpreter_certification_state.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const interpreter_certification_state = new Interpreter_certification_state({
    interpreter_id: req.body.interpreter_id,
    interpreter_certifications_id : req.body.interpreter_certifications_id ,
    state_id : req.body.state_id,
  });

  Interpreter_certification_state.create(interpreter_certification_state, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Interpreter_certification_state."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Interpreter_certification_state.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Interpreter_certification_states."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Interpreter_certification_state.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Interpreter_certification_state with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Interpreter_certification_state with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Interpreter_certification_state.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Interpreter_certification_states."
      });
    else res.send(data);
  });
};

exports.update = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Interpreter_certification_state.updateById(
    req.params.id,
    new Interpreter_certification_state(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Interpreter_certification_state with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Interpreter_certification_state with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Interpreter_certification_state.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Interpreter_certification_state with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Interpreter_certification_state with id " + req.params.id
        });
      }
    } else res.send({ message: `Interpreter_certification_state was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Interpreter_certification_state.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Interpreter_certification_states."
      });
    else res.send({ message: `All Interpreter_certification_states were deleted successfully!` });
  });
};
