const Type_phone = require("../models/type_phone.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const type_phone = new Type_phone({

    id: req.body.id,
    type: req.body.type,
  });

  Type_phone.create(type_phone, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Type_phone."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Type_phone.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Type_phones."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Type_phone.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Type_phone with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Type_phone with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Type_phone.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Type_phones."
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

  Type_phone.updateById(
    req.params.id,
    new Type_phone(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Type_phone with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Type_phone with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Type_phone.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Type_phone with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Type_phone with id " + req.params.id
        });
      }
    } else res.send({ message: `Type_phone was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Type_phone.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Type_phones."
      });
    else res.send({ message: `All Type_phones were deleted successfully!` });
  });
};
