const Estimate_quot = require("../models/estimate_quot.model.js");

// Create and Save a new Invoice
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const estimate_quot = new Estimate_quot({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  Estimate_quot.create(estimate_quot, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Estimate_quot."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Estimate_quot.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Estimate_quote."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Estimate_quot.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Estimate_quot with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Estimate_quot with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Estimate_quot.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Estimate_quote."
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

  Estimate_quot.updateById(
    req.params.id,
    new Estimate_quot(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Estimate_quot with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Estimate_quot with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Estimate_quot.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Estimate_quot with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Estimate_quot with id " + req.params.id
        });
      }
    } else res.send({ message: `Estimate_quot was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Estimate_quot.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Estimate_quote."
      });
    else res.send({ message: `All Estimate_quote were deleted successfully!` });
  });
};
