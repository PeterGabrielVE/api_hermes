const 	Assignments_statu = require("../models/assignments_statu.model.js");

// Create and Save a new 
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a 
  const assignments_statu = new Assignments_statu({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  // Save Invoice in the database
  Assignments_statu.create(assignments_statu, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Assignments_statu."
      });
    else res.send(data);
  });
};

// Retrieve all  from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Assignments_statu.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving 	Assignments_status."
      });
    else res.send(data);
  });
};

// Find a single  by Id
exports.findOne = (req, res) => {
    Assignments_statu.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Assignments_statu with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Assignments_statu with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Invoices
exports.findAllPublished = (req, res) => {
    Assignments_statu.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving 	Assignments_status."
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

  Assignments_statu.updateById(
    req.params.id,
    new Assignments_statu(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Assignments_statu with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Assignments_statu with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a  with the specified id in the request
exports.delete = (req, res) => {
    Assignments_statu.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Assignments_statu with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Assignments_statu with id " + req.params.id
        });
      }
    } else res.send({ message: `Assignments_statu was deleted successfully!` });
  });
};

// Delete all  from the database.
exports.deleteAll = (req, res) => {
Assignments_statu.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Assignments_status."
      });
    else res.send({ message: `All Assignments_status were deleted successfully!` });
  });
};