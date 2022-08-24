const Service_estimate_jo = require("../models/service_estimate_jo.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const service_estimate_jo = new Service_estimate_jo({
    service_request_id: req.body.service_request_id,
    estimate_quote_id: req.body.estimate_quote_id,
    job_id: req.body.job_id,
  });

  Service_estimate_jo.create(service_estimate_jo, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Service_estimate_jo."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Service_estimate_jo.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Service_estimate_job."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Service_estimate_jo.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Service_estimate_jo with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Service_estimate_jo with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Service_estimate_jo.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Service_estimate_job."
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

  Service_estimate_jo.updateById(
    req.params.id,
    new Service_estimate_jo(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Service_estimate_jo with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Service_estimate_jo with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Service_estimate_jo.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Service_estimate_jo with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Service_estimate_jo with id " + req.params.id
        });
      }
    } else res.send({ message: `Service_estimate_jo was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Service_estimate_jo.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Service_estimate_job."
      });
    else res.send({ message: `All Service_estimate_job were deleted successfully!` });
  });
};
