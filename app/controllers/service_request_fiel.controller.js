const Service_request_fiel = require("../models/service_request_fiel.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const service_request_fiel = new Service_request_fiel({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  Service_request_fiel.create(service_request_fiel, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Service_request_fiel."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Service_request_fiel.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Service_request_field."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Service_request_fiel.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Service_request_fiel with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Service_request_fiel with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Service_request_fiel.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Service_request_field."
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

  Service_request_fiel.updateById(
    req.params.id,
    new Service_request_fiel(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Service_request_fiel with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Service_request_fiel with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Service_request_fiel.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Service_request_fiel with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Service_request_fiel with id " + req.params.id
        });
      }
    } else res.send({ message: `Service_request_fiel was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Service_request_fiel.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Service_request_field."
      });
    else res.send({ message: `All Service_request_field were deleted successfully!` });
  });
};
