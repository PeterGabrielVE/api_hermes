const Services_ne = require("../models/services_ne.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const services_ne = new Services_ne({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  Services_ne.create(services_ne, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Services_ne."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Services_ne.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Services_new."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Services_ne.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Services_ne with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Services_ne with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Services_ne.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Services_new."
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

  Services_ne.updateById(
    req.params.id,
    new Services_ne(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Services_ne with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Services_ne with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Services_ne.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Services_ne with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Services_ne with id " + req.params.id
        });
      }
    } else res.send({ message: `Services_ne was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Services_ne.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Services_new."
      });
    else res.send({ message: `All Services_new were deleted successfully!` });
  });
};