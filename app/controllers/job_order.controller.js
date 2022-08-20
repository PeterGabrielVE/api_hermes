const Job_order = require("../models/job_order.model.js");

// Create and Save a new Invoice
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const job_order = new Job_order({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  Job_order.create(job_order, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Job_order."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Job_order.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Job_orders."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Job_order.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Job_order with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Job_order with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Job_order.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Job_orders."
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

  Job_order.updateById(
    req.params.id,
    new Job_order(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Job_order with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Job_order with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Job_order.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Job_order with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Job_order with id " + req.params.id
        });
      }
    } else res.send({ message: `Job_order was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Job_order.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Job_orders."
      });
    else res.send({ message: `All Job_orders were deleted successfully!` });
  });
};
