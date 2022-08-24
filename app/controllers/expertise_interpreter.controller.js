const Expertise_interpreter = require("../models/expertise_interpreter.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const expertise_interpreter = new Expertise_interpreter({
    name: req.body.name,
  });

  Expertise_interpreter.create(expertise_interpreter, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Expertise_interpreter."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Expertise_interpreter.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Expertise_interpreters."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Expertise_interpreter.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Expertise_interpreter with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Expertise_interpreter with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Expertise_interpreter.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Expertise_interpreters."
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

  Expertise_interpreter.updateById(
    req.params.id,
    new Expertise_interpreter(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Expertise_interpreter with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Expertise_interpreter with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Expertise_interpreter.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Expertise_interpreter with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Expertise_interpreter with id " + req.params.id
        });
      }
    } else res.send({ message: `Expertise_interpreter was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Expertise_interpreter.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Expertise_interpreters."
      });
    else res.send({ message: `All Expertise_interpreters were deleted successfully!` });
  });
};
