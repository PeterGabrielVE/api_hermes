const Service_offered = require("../models/service_offered.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const service_offered = new Service_offered({
    SO_Name: req.body.SO_Name,
  });

  Service_offered.create(service_offered, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Service_offered."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Service_offered.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Service_offereds."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Service_offered.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Service_offered with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Service_offered with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Service_offered.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Service_offereds."
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

  Service_offered.updateById(
    req.params.id,
    new Service_offered(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Service_offered with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Service_offered with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Service_offered.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Service_offered with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Service_offered with id " + req.params.id
        });
      }
    } else res.send({ message: `Service_offered was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Service_offered.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Service_offereds."
      });
    else res.send({ message: `All Service_offereds were deleted successfully!` });
  });
};
