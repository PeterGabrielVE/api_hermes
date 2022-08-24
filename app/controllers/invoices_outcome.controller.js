const Invoices_outcome = require("../models/invoices_outcome.model.js");

// Create and Save a new Invoice
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const invoices_outcome = new Invoices_outcome({
    name: req.body.name
  });

  Invoices_outcome.create(invoices_outcome, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Invoices_outcome."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Invoices_outcome.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Invoices_outcomes."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Invoices_outcome.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Invoices_outcome with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Invoices_outcome with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
  Invoices_outcome.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Invoices_outcomes."
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

  Invoices_outcome.updateById(
    req.params.id,
    new Invoices_outcome(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Invoices_outcome with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Invoices_outcome with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Invoices_outcome.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Invoices_outcome with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Invoices_outcome with id " + req.params.id
        });
      }
    } else res.send({ message: `Invoices_outcome was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Invoices_outcome.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Invoices_outcomes."
      });
    else res.send({ message: `All Invoices_outcomes were deleted successfully!` });
  });
};
