const State = require("../models/state.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const state = new State({
    name: req.body.name,
    abbreviation: req.body.abbreviation,
  });

  State.create(state, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the State."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  State.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving States."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    State.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found State with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving State with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    State.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving States."
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

  State.updateById(
    req.params.id,
    new State(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found State with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating State with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    State.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found State with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete State with id " + req.params.id
        });
      }
    } else res.send({ message: `State was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    State.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all States."
      });
    else res.send({ message: `All States were deleted successfully!` });
  });
};
