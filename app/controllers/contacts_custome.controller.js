const Contacts_custome = require("../models/contacts_custome.model.js");

exports.create = (req, res) => {
 
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const contacts_custome = new Contacts_custome({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  Contacts_custome.create(contacts_custome, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Contacts_custome."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

Contacts_custome.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Contacts_customer."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Contacts_custome.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Contacts_custome with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Contacts_custome with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Contacts_custome.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Contacts_customer."
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

  Contacts_custome.updateById(
    req.params.id,
    new Contacts_custome(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Contacts_custome with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Contacts_custome with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Contacts_custome.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Contacts_custome with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Contacts_custome with id " + req.params.id
        });
      }
    } else res.send({ message: `Contacts_custome was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Contacts_custome.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Contacts_customer."
      });
    else res.send({ message: `All Contacts_customer were deleted successfully!` });
  });
};
