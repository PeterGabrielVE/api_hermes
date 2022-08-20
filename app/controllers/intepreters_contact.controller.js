const Intepreters_contact = require("../models/intepreters_contact.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const intepreters_contact = new Intepreters_contact({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  Intepreters_contact.create(intepreters_contact, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Intepreters_contact."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Intepreters_contact.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Intepreters_contacts."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Intepreters_contact.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Intepreters_contact with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Intepreters_contact with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Intepreters_contact.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Intepreters_contacts."
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

  Intepreters_contact.updateById(
    req.params.id,
    new Intepreters_contact(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Intepreters_contact with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Intepreters_contact with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Intepreters_contact.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Intepreters_contact with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Intepreters_contact with id " + req.params.id
        });
      }
    } else res.send({ message: `Intepreters_contact was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Intepreters_contact.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Intepreters_contacts."
      });
    else res.send({ message: `All Intepreters_contacts were deleted successfully!` });
  });
};
