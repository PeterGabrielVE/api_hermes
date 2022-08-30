const Peopl = require("../models/peopl.model.js");

// Create and Save a new Invoice
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const peopl = new Peopl({
    id_auto: req.body.id_auto,
    id: req.body.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    middle_name: req.body.middle_name,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
  });

  Peopl.create(peopl, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Peopl."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Peopl.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving People."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Peopl.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Peopl with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Peopl with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Peopl.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving People."
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

  Peopl.updateById(
    req.params.id,
    new Peopl(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Peopl with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Peopl with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Peopl.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Peopl with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Peopl with id " + req.params.id
        });
      }
    } else res.send({ message: `Peopl was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Peopl.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all People."
      });
    else res.send({ message: `All People were deleted successfully!` });
  });
};
