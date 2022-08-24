const Notes_interpreter = require("../models/notes_interpreter.model.js");

// Create and Save a new Invoice
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const notes_interpreter = new Notes_interpreter({
    Note_Date: req.body.Note_Date,
    Note_Description: req.body.Note_Description,
    Interpreter_ID : req.body.Interpreter_ID,
  });

  Notes_interpreter.create(notes_interpreter, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Notes_interpreter."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Notes_interpreter.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Notes_interpreters."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Notes_interpreter.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Notes_interpreter with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Notes_interpreter with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Notes_interpreter.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Notes_interpreters."
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

  Notes_interpreter.updateById(
    req.params.id,
    new Notes_interpreter(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Notes_interpreter with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Notes_interpreter with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Notes_interpreter.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Notes_interpreter with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Notes_interpreter with id " + req.params.id
        });
      }
    } else res.send({ message: `Notes_interpreter was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Notes_interpreter.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Notes_interpreters."
      });
    else res.send({ message: `All Notes_interpreters were deleted successfully!` });
  });
};
