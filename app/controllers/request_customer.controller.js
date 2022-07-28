const Request_customer = require("../models/request_customer.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const request_customer = new Request_customer({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  Request_customer.create(request_customer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Request_customer."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Request_customer.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Request_customers."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Request_customer.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Request_customer with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Request_customer with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Request_customer.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Request_customers."
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

  Request_customer.updateById(
    req.params.id,
    new Request_customer(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Request_customer with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Request_customer with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Request_customer.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Request_customer with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Request_customer with id " + req.params.id
        });
      }
    } else res.send({ message: `Request_customer was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Request_customer.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Request_customers."
      });
    else res.send({ message: `All Request_customers were deleted successfully!` });
  });
};
