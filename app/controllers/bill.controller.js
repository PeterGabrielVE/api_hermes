const Bill = require("../models/bill.model.js");

// Create and Save a new Agencie
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Agencie
  const bill = new Bill({
    date: req.body.date,
    job_id: req.body.job_id,
    per_hwpm : req.body.per_hwpm,
    hwpm : req.body.hwpm,
    totalhwpm : req.body.totalhwpm,
    per_mile : req.body.per_mile,
    miles : req.body.miles,
    totalpermiles : req.body.totalpermiles,
    totalhwpmmiles : req.body.totalhwpmmiles,
    totaltraveltime : req.body.totaltraveltime,
    parkingtolls : req.body.parkingtolls,
    cancelation : req.body.cancelation,
    credit : req.body.credit,
    balance : req.body.balance,
    status : req.body.status,

  });

  // Save Agencie in the database
  Bill.create(bill, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Bill."
      });
    else res.send(data);
  });
};

// Retrieve all Agencies from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Bill.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Bills."
      });
    else res.send(data);
  });
};

// Find a single Agencie by Id
exports.findOne = (req, res) => {
  Bill.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Bill with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Bill with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Agencies
exports.findAllPublished = (req, res) => {
  Bill.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Bills."
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

  Bill.updateById(
    req.params.id,
    new Bill(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Bill with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Bill with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Agencie with the specified id in the request
exports.delete = (req, res) => {
 Bill.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Bill with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Bill with id " + req.params.id
        });
      }
    } else res.send({ message: `Bill was deleted successfully!` });
  });
};

// Delete all Agencies from the database.
exports.deleteAll = (req, res) => {
 Bill.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Bills."
      });
    else res.send({ message: `All Bills were deleted successfully!` });
  });
};
