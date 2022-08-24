const Interpreter_afiliation = require("../models/interpreter_afiliation.model.js");

// Create and Save a new Invoice
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const interpreter_afiliation = new Interpreter_afiliation({
    name: req.body.name,
    member: req.body.member,
    title: req.body.title,
    interpreter_id: req.body.interpreter_id,
  });

  Interpreter_afiliation.create(interpreter_afiliation, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Interpreter_afiliation."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Interpreter_afiliation.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Interpreter_afiliations."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Interpreter_afiliation.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Interpreter_afiliation with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Interpreter_afiliation with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Interpreter_afiliation.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Interpreter_afiliations."
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

  Interpreter_afiliation.updateById(
    req.params.id,
    new Interpreter_afiliation(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Interpreter_afiliation with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Interpreter_afiliation with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Interpreter_afiliation.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Interpreter_afiliation with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Interpreter_afiliation with id " + req.params.id
        });
      }
    } else res.send({ message: `Interpreter_afiliation was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Interpreter_afiliation.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Interpreter_afiliations."
      });
    else res.send({ message: `All Interpreter_afiliations were deleted successfully!` });
  });
};
