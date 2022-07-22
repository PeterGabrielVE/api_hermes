const 	Assignment = require("../models/assignment.model.js");

// Create and Save a new 
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a 
  const assignment = new Assignment({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  // Save Invoice in the database
  Assignment.create(assignment, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Assignment."
      });
    else res.send(data);
  });
};

// Retrieve all  from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Assignment.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving 	Assignments."
      });
    else res.send(data);
  });
};

// Find a single  by Id
exports.findOne = (req, res) => {
    Assignment.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Assignment with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Assignment with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Invoices
exports.findAllPublished = (req, res) => {
    Assignment.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving 	Assignments."
      });
    else res.send(data);
  });
};

// Update a  identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Assignment.updateById(
    req.params.id,
    new Assignment(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Assignment with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Assignment with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a  with the specified id in the request
exports.delete = (req, res) => {
    Assignment.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Assignment with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Assignment with id " + req.params.id
        });
      }
    } else res.send({ message: `Assignment was deleted successfully!` });
  });
};

// Delete all  from the database.
exports.deleteAll = (req, res) => {
Assignment.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Assignments."
      });
    else res.send({ message: `All Assignments were deleted successfully!` });
  });
};
