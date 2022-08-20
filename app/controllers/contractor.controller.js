const Contractor = require("../models/contractor.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const contractor = new Contractor({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  Contractor.create(contractor, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Contractor."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Contractor.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Contractors."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Contractor.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Contractor with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Contractor with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Contractor.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Contractors."
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

  Contractor.updateById(
    req.params.id,
    new Contractor(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Contractor with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Contractor with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Contractor.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Contractor with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Contractor with id " + req.params.id
        });
      }
    } else res.send({ message: `Contractor was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Contractor.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Contractors."
      });
    else res.send({ message: `All Contractors were deleted successfully!` });
  });
};
