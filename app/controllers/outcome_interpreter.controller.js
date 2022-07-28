const Outcome_interpreter = require("../models/outcome_interpreter.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const outcome_interpreter = new Outcome_interpreter({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  Outcome_interpreter.create(outcome_interpreter, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Outcome_interpreter."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Outcome_interpreter.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Outcome_interpreters."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Outcome_interpreter.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Outcome_interpreter with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Outcome_interpreter with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Outcome_interpreter.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Outcome_interpreters."
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

  Outcome_interpreter.updateById(
    req.params.id,
    new Outcome_interpreter(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Outcome_interpreter with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Outcome_interpreter with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Outcome_interpreter.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Outcome_interpreter with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Outcome_interpreter with id " + req.params.id
        });
      }
    } else res.send({ message: `Outcome_interpreter was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Outcome_interpreter.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Outcome_interpreters."
      });
    else res.send({ message: `All Outcome_interpreters were deleted successfully!` });
  });
};