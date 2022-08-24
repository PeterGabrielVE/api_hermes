const Qualificatio = require("../models/qualificatio.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const qualificatio = new Qualificatio({
    type: req.body.type,
  });

  Qualificatio.create(qualificatio, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Qualificatio."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Qualificatio.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Qualification."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Qualificatio.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Qualificatio with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Qualificatio with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Qualificatio.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Qualification."
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

  Qualificatio.updateById(
    req.params.id,
    new Qualificatio(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Qualificatio with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Qualificatio with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Qualificatio.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Qualificatio with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Qualificatio with id " + req.params.id
        });
      }
    } else res.send({ message: `Qualificatio was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Qualificatio.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Qualification."
      });
    else res.send({ message: `All Qualification were deleted successfully!` });
  });
};
