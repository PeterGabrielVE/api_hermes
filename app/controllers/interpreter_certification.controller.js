const Interpreter_certification = require("../models/interpreter_certification.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const interpreter_certification = new Interpreter_certification({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });
  Interpreter_certification.create(interpreter_certification, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Interpreter_certification."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Interpreter_certification.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Interpreter_certifications."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Interpreter_certification.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Interpreter_certification with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Interpreter_certification with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
  Interpreter_certification.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Interpreter_certifications."
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

  Interpreter_certification.updateById(
    req.params.id,
    new Interpreter_certification(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Interpreter_certification with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Interpreter_certification with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Interpreter_certification.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Interpreter_certification with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Interpreter_certification with id " + req.params.id
        });
      }
    } else res.send({ message: `Interpreter_certification was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Interpreter_certification.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Interpreter_certifications."
      });
    else res.send({ message: `All Interpreter_certifications were deleted successfully!` });
  });
};
