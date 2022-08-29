const Bill_payment = require("../models/bill_payment.model.js");

// Create and Save a new Agencie
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Agencie
  const bill_payment = new Bill_payment({
    status: req.body.status,
    date_receive: req.body.date_receive,
    bills_list: req.body.bills_list,
    assignments_list: req.body.assignments_list,
    interpreter_id : req.body.interpreter_id,
    payment_method: req.body.payment_method,
    date_Payment: req.body.date_Payment,
    transaction_number: req.body.transaction_number,
    check_number: req.body.check_number,
    attachment: req.body.attachment,
    payment_total: req.body.payment_total,
    account: req.body.account,
    check_payment_date: req.body.check_payment_date,
    attachment_Check_Trans: req.body.attachment_Check_Trans,
  });

  // Save Agencie in the database
  Bill_payment.create(bill_payment, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Bill_payment."
      });
    else res.send(data);
  });
};

// Retrieve all Agencies from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Bill_payment.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Bill_payments."
      });
    else res.send(data);
  });
};

// Find a single Agencie by Id
exports.findOne = (req, res) => {
    Bill_payment.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Bill_payment with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Bill_payment with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Agencies
exports.findAllPublished = (req, res) => {
    Bill_payment.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Bill_payments."
      });
    else res.send(data);
  });
};

// Update a Agencie identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Bill_payment.updateById(
    req.params.id,
    new Bill_payment(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Bill_payment with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Bill_payment with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Agencie with the specified id in the request
exports.delete = (req, res) => {
    Bill_payment.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Bill_payment with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Bill_payment with id " + req.params.id
        });
      }
    } else res.send({ message: `Bill_payment was deleted successfully!` });
  });
};

// Delete all Agencies from the database.
exports.deleteAll = (req, res) => {
    Bill_payment.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Bill_payments."
      });
    else res.send({ message: `All Bill_payments were deleted successfully!` });
  });
};
