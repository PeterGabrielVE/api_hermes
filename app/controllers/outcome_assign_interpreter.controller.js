const Outcome_assign_interpreter = require("../models/outcome_assign_interpreter.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const iutcome_assign_interpreter = new Outcome_assign_interpreter({
    interpreter_id : req.body.interpreter_id ,
    jobs_id : req.body.jobs_id ,
    outcome_id : req.body.outcome_id ,
    notes: req.body.notes,
  });

  Outcome_assign_interpreter.create(outcome_assign_interpreter, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Outcome_assign_interpreter."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Outcome_assign_interpreter.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Outcome_assign_interpreters."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Outcome_assign_interpreter.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Outcome_assign_interpreter with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Outcome_assign_interpreter with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Outcome_assign_interpreter.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Outcome_assign_interpreters."
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

  Outcome_assign_interpreter.updateById(
    req.params.id,
    new Outcome_assign_interpreter(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Outcome_assign_interpreter with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Outcome_assign_interpreter with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Outcome_assign_interpreter.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Outcome_assign_interpreter with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Outcome_assign_interpreter with id " + req.params.id
        });
      }
    } else res.send({ message: `Outcome_assign_interpreter was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Outcome_assign_interpreter.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Outcome_assign_interpreters."
      });
    else res.send({ message: `All Outcome_assign_interpreters were deleted successfully!` });
  });
};
