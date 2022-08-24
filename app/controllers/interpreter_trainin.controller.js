const Interpreter_trainin = require("../models/interpreter_trainin.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const interpreter_trainin = new Interpreter_trainin({
    name: req.body.name,
    last_name: req.body.last_name,
    phone_number: req.body.phone_number,
    email: req.body.email,
    date_enroll: req.body.date_enroll,
    updated_at: req.body.updated_at,
    created_at: req.body.created_at,
  });

  Interpreter_trainin.create(interpreter_trainin, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Interpreter_trainin."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Interpreter_trainin.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Interpreter_training."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Interpreter_trainin.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Interpreter_trainin with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Interpreter_trainin with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Interpreter_trainin.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Interpreter_training."
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

  Interpreter_trainin.updateById(
    req.params.id,
    new Interpreter_trainin(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Interpreter_trainin with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Interpreter_trainin with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Interpreter_trainin.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Interpreter_trainin with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Interpreter_trainin with id " + req.params.id
        });
      }
    } else res.send({ message: `Interpreter_trainin was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
 Interpreter_trainin.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Interpreter_training."
      });
    else res.send({ message: `All Interpreter_training were deleted successfully!` });
  });
};
