const Agencie = require("../models/agencie.model.js");

// Create and Save a new Agencie
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Agencie
  const agencie = new Agencie({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  // Save Agencie in the database
  Agencie.create(agencie, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Agencie."
      });
    else res.send(data);
  });
};

// Retrieve all Agencies from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Agencie.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Agencies."
      });
    else res.send(data);
  });
};

// Find a single Agencie by Id
exports.findOne = (req, res) => {
  Agencie.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Agencie with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Agencie with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Agencies
exports.findAllPublished = (req, res) => {
  Agencie.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Agencies."
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

  Agencie.updateById(
    req.params.id,
    new Agencie(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Agencie with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Agencie with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Agencie with the specified id in the request
exports.delete = (req, res) => {
  Agencie.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Agencie with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Agencie with id " + req.params.id
        });
      }
    } else res.send({ message: `Agencie was deleted successfully!` });
  });
};

// Delete all Agencies from the database.
exports.deleteAll = (req, res) => {
  Agencie.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Agencies."
      });
    else res.send({ message: `All Agencies were deleted successfully!` });
  });
};
