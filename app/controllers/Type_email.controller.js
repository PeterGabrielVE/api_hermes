const Type_email = require("../models/type_email.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const type_email = new Type_email({
    name: req.body.name,
  });

  Type_email.create(type_email, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Type_email."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Type_email.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Type_emails."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Type_email.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Type_email with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Type_email with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Type_email.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Type_emails."
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

  Type_email.updateById(
    req.params.id,
    new Type_email(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Type_email with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Type_email with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Type_email.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Type_email with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Type_email with id " + req.params.id
        });
      }
    } else res.send({ message: `Type_email was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Type_email.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Type_emails."
      });
    else res.send({ message: `All Type_emails were deleted successfully!` });
  });
};
