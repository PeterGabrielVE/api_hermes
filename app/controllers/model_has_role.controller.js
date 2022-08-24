const Model_has_role = require("../models/model_has_role.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const model_has_role = new Invoice({
    role_id : req.body.role_id ,
    model_type : req.body.model_type ,
    model_id : req.body.model_id,
  });

  Model_has_role.create(model_has_role, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Model_has_role."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Model_has_role.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Model_has_roles."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Model_has_role.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Model_has_role with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Model_has_role with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Model_has_role.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Model_has_roles."
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

  Model_has_role.updateById(
    req.params.id,
    new Model_has_role(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Model_has_role with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Model_has_role with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Model_has_role.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Model_has_role with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Model_has_role with id " + req.params.id
        });
      }
    } else res.send({ message: `Model_has_role was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Model_has_role.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Model_has_roles."
      });
    else res.send({ message: `All Model_has_roles were deleted successfully!` });
  });
};
