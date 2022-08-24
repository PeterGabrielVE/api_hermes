const Job_orders_statu = require("../models/job_orders_statu.model.js");

// Create and Save a new Invoice
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const job_orders_statu = new Job_orders_statu({
    name: req.body.name,
  });

  Job_orders_statu.create(job_orders_statu, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Job_orders_statu."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Job_orders_statu.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Job_orders_status."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Job_orders_statu.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Job_orders_statu with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Job_orders_statu with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Job_orders_statu.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Job_orders_status."
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

  Job_orders_statu.updateById(
    req.params.id,
    new Job_orders_statu(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Job_orders_statu with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Job_orders_statu with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Job_orders_statu.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Job_orders_statu with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Job_orders_statu with id " + req.params.id
        });
      }
    } else res.send({ message: `Job_orders_statu was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Job_orders_statu.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Job_orders_status."
      });
    else res.send({ message: `All Job_orders_status were deleted successfully!` });
  });
};
