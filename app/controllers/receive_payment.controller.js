const Receive_payment = require("../models/receive_payment.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const receive_payment = new Receive_payment({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  Receive_payment.create(receive_payment, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Receive_payment."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Receive_payment.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Receive_payments."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Receive_payment.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Receive_payment with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Receive_payment with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Receive_payment.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Receive_payments."
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

  Receive_payment.updateById(
    req.params.id,
    new Receive_payment(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Receive_payment with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Receive_payment with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Receive_payment.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Receive_payment with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Receive_payment with id " + req.params.id
        });
      }
    } else res.send({ message: `Receive_payment was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Receive_payment.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Receive_payments."
      });
    else res.send({ message: `All Receive_payments were deleted successfully!` });
  });
};
