const History_log = require("../models/history_log.model.js");

// Create and Save a new Invoice
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const history_log = new History_log({
    name: req.body.name,
    info: req.body.info,
    created_at: req.body.created_at,
    created_by: req.body.created_by,
    files: req.body.files,
    markRead: req.body.markRead,
    id_object: req.body.id_object,
  });

  History_log.create(history_log, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the History_log."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  History_log.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving History_logs."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    History_log.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found History_log with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving History_log with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    History_log.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving History_logs."
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

  History_log.updateById(
    req.params.id,
    new History_log(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found History_log with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating History_log with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    History_log.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found History_log with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete History_log with id " + req.params.id
        });
      }
    } else res.send({ message: `History_log was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    History_log.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all History_logs."
      });
    else res.send({ message: `All History_logs were deleted successfully!` });
  });
};
