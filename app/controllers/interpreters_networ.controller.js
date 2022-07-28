const Interpreters_networ = require("../models/interpreters_networ.model.js");

// Create and Save a new Invoice
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const interpreters_networ = new Interpreters_networ({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });
  Interpreters_networ.create(interpreters_networ, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Interpreters_networ."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Interpreters_networ.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Interpreters_network."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Interpreters_networ.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Interpreters_networ with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Interpreters_networ with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Interpreters_networ.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Interpreters_network."
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

  Interpreters_networ.updateById(
    req.params.id,
    new Interpreters_networ(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Interpreters_networ with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Interpreters_networ with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Interpreters_networ.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Interpreters_networ with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Interpreters_networ with id " + req.params.id
        });
      }
    } else res.send({ message: `Interpreters_networ was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
 Interpreters_networ.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Interpreters_network."
      });
    else res.send({ message: `All Interpreters_network were deleted successfully!` });
  });
};
