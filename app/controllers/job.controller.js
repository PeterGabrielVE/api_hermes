const Job = require("../models/job.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const job = new Job({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  Job.create(job, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Job."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Job.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Jobs."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Job.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Job with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Job with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Job.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Jobs."
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

  Job.updateById(
    req.params.id,
    new Job(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Job with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Job with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Job.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Job with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Job with id " + req.params.id
        });
      }
    } else res.send({ message: `Job was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Job.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Jobs."
      });
    else res.send({ message: `All Jobs were deleted successfully!` });
  });
};
