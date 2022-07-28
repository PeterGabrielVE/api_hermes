const Password_reset = require("../models/password_reset.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const password_reset = new Password_reset({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  Password_reset.create(password_reset, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Password_reset."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Password_reset.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Password_resets."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Password_reset.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Password_reset with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Password_reset with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
  Password_reset.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Password_resets."
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

  Password_reset.updateById(
    req.params.id,
    new Password_reset(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Password_reset with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Password_reset with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Password_reset.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Password_reset with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Password_reset with id " + req.params.id
        });
      }
    } else res.send({ message: `Password_reset was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Password_reset.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Password_resets."
      });
    else res.send({ message: `All Password_resets were deleted successfully!` });
  });
};
