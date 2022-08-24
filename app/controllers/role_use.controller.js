const Role_use = require("../models/role_use.model.js");

// Create and Save a new Invoice
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const role_use = new Role_use({
    role_id: req.body.role_id,
    user_id: req.body.user_id,
  });

  Role_use.create(role_use, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Role_use."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Role_use.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Role_user."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Role_use.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Role_use with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Role_use with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
  Role_use.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Role_user."
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

  Role_use.updateById(
    req.params.id,
    new Role_use(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Role_use with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Role_use with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Role_use.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Role_use with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Role_use with id " + req.params.id
        });
      }
    } else res.send({ message: `Role_use was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Role_use.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Role_user."
      });
    else res.send({ message: `All Role_use were deleted successfully!` });
  });
};
