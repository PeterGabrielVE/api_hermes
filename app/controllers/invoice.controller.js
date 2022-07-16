const Invoice = require("../models/invoice.model.js");

// Create and Save a new Invoice
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Invoice
  const invoice = new Invoice({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  // Save Invoice in the database
  Invoice.create(invoice, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Invoice."
      });
    else res.send(data);
  });
};

// Retrieve all Invoices from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Invoice.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Invoices."
      });
    else res.send(data);
  });
};

// Find a single Invoice by Id
exports.findOne = (req, res) => {
  Invoice.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Invoice with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Invoice with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Invoices
exports.findAllPublished = (req, res) => {
  Invoice.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Invoices."
      });
    else res.send(data);
  });
};

// Update a Invoice identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Invoice.updateById(
    req.params.id,
    new Invoice(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Invoice with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Invoice with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Invoice with the specified id in the request
exports.delete = (req, res) => {
  Invoice.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Invoice with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Invoice with id " + req.params.id
        });
      }
    } else res.send({ message: `Invoice was deleted successfully!` });
  });
};

// Delete all Invoices from the database.
exports.deleteAll = (req, res) => {
  Invoice.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Invoices."
      });
    else res.send({ message: `All Invoices were deleted successfully!` });
  });
};
