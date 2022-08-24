const Phone = require("../models/phone.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const phone = new Phone({
    number: req.body.number,
    ext: req.body.ext,
    type: req.body.type,
    contactcustomer_id : req.body.contactcustomer_id ,
  });

  Phone.create(phone, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Phone."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Phone.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Phones."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Phone.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Phone with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Phone with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Phone.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Phones."
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

  Phone.updateById(
    req.params.id,
    new Phone(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Phone with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Phone with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Phone.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Phone with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Phone with id " + req.params.id
        });
      }
    } else res.send({ message: `Phone was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Phone.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Phones."
      });
    else res.send({ message: `All Phones were deleted successfully!` });
  });
};
