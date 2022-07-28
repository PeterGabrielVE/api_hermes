const Email = require("../models/email.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const email = new Email({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  Email.create(email, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Email."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Email.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Emails."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Email.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Email with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Email with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Email.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Emails."
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

  Email.updateById(
    req.params.id,
    new Email(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Email with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Email with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Email.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Email with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Email with id " + req.params.id
        });
      }
    } else res.send({ message: `Email was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Email.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Emails."
      });
    else res.send({ message: `All Emails were deleted successfully!` });
  });
};
