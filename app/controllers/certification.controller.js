const Certification = require("../models/certification.model.js");

// Create and Save a new Invoice
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Invoice
  const certification = new Certification({
    name: req.body.name,
  });

  // Save Invoice in the database
  Certification.create(certification, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Certification."
      });
    else res.send(data);
  });
};

// Retrieve all Invoices from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Certification.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Certifications."
      });
    else res.send(data);
  });
};

// Find a single Invoice by Id
exports.findOne = (req, res) => {
    Certification.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Certification with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Certification with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Invoices
exports.findAllPublished = (req, res) => {
    Certification.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Certifications."
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

  Certification.updateById(
    req.params.id,
    new Certification(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Certification with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Certification with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Invoice with the specified id in the request
exports.delete = (req, res) => {
    Certification.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Certification with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Certification with id " + req.params.id
        });
      }
    } else res.send({ message: `Certification was deleted successfully!` });
  });
};

// Delete all Invoices from the database.
exports.deleteAll = (req, res) => {
 Certification.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Certifications."
      });
    else res.send({ message: `All Certifications were deleted successfully!` });
  });
};
