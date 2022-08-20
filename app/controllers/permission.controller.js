const Permission = require("../models/permission.model.js");

// Create and Save a new Invoice
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const permission = new Permission({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  Permission.create(permission, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Permission."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Permission.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Permissions."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Permission.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Permission with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Permission with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Permission.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Permissions."
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

  Permission.updateById(
    req.params.id,
    new Permission(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Permission with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Permission with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Permission.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Permission with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Permission with id " + req.params.id
        });
      }
    } else res.send({ message: `Permission was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Permission.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Permissions."
      });
    else res.send({ message: `All Permissions were deleted successfully!` });
  });
};
