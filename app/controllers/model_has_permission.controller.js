const Model_has_permission = require("../models/model_has_permission.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const model_has_permission = new Model_has_permission({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  Model_has_permission.create(model_has_permission, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Model_has_permission."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Model_has_permission.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Model_has_permissions."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Model_has_permission.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Model_has_permission with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Model_has_permission with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Model_has_permission.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Model_has_permissions."
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

  Model_has_permission.updateById(
    req.params.id,
    new Model_has_permission(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Model_has_permission with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Model_has_permission with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Model_has_permission.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Model_has_permission with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Model_has_permission with id " + req.params.id
        });
      }
    } else res.send({ message: `Model_has_permission was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Model_has_permission.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Model_has_permissions."
      });
    else res.send({ message: `All Model_has_permissions were deleted successfully!` });
  });
};
