const Email_customer = require("../models/email_customer.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const email_customer = new Email_customer({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  Email_customer.create(email_customer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Email_customer."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Email_customer.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Email_customers."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Email_customer.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Email_customer with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Email_customer with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Email_customer.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Email_customers."
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

  Email_customer.updateById(
    req.params.id,
    new Email_customer(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Email_customer with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Email_customer with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Email_customer.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Email_customer with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Email_customer with id " + req.params.id
        });
      }
    } else res.send({ message: `Email_customer was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Email_customer.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Email_customers."
      });
    else res.send({ message: `All Email_customers were deleted successfully!` });
  });
};
