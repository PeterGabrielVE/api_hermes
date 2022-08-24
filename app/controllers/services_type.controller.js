const Services_type = require("../models/services_type.model.js");

// Create and Save a new Invoice
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const services_type = new Services_type({
    service_name: req.body.service_name,
    service_code: req.body.service_code,
    service_status: req.body.service_status,
  });

  Services_type.create(services_type, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Services_type."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Services_type.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Services_types."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Services_type.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Services_type with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Services_type with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Services_type.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Services_types."
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

  Services_type.updateById(
    req.params.id,
    new Services_type(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Services_type with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Services_type with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Services_type.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Services_type with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Services_type with id " + req.params.id
        });
      }
    } else res.send({ message: `Services_type was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Services_type.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Services_types."
      });
    else res.send({ message: `All Services_types were deleted successfully!` });
  });
};
