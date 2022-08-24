const Language = require("../models/language.model.js");

// Create and Save a new Invoice
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const language = new Language({
    language: req.body.language,
  });

  Language.create(language, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Language."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Language.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Languages."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Language.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Language with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Language with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Language.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Languages."
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

  Language.updateById(
    req.params.id,
    new Language(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Language with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Language with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Language.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Language with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Language with id " + req.params.id
        });
      }
    } else res.send({ message: `Language was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Language.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Languages."
      });
    else res.send({ message: `All Languages were deleted successfully!` });
  });
};
