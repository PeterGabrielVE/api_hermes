const Receive_payment_invoic = require("../models/receive_payment_invoic.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const receive_payment_invoic = new Receive_payment_invoic({
    invoice_id: req.body.invoice_id,
    receive_id: req.body.receive_id,
  });

  Receive_payment_invoic.create(receive_payment_invoic, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Receive_payment_invoic."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Receive_payment_invoic.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Receive_payment_invoice."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Receive_payment_invoic.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Receive_payment_invoic with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Receive_payment_invoic with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Receive_payment_invoic.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Receive_payment_invoice."
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

  Receive_payment_invoic.updateById(
    req.params.id,
    new Receive_payment_invoic(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Receive_payment_invoic with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Receive_payment_invoic with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Receive_payment_invoic.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Receive_payment_invoic with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Receive_payment_invoic with id " + req.params.id
        });
      }
    } else res.send({ message: `Receive_payment_invoic was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Receive_payment_invoic.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Receive_payment_invoice."
      });
    else res.send({ message: `All Receive_payment_invoice were deleted successfully!` });
  });
};
