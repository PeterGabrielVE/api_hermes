const Zip_code = require("../models/zip_code.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const zip_code = new Zip_code({
    zip: req.body.zip,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    city: req.body.city,
    state: req.body.state,
    county_name: req.body.county_name,
  });

  Zip_code.create(zip_code, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Zip_code."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Zip_code.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Zip_codes."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Zip_code.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Zip_code with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Zip_code with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Zip_code.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Zip_codes."
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

  Zip_code.updateById(
    req.params.id,
    new Zip_code(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Zip_code with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Zip_code with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Zip_code.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Zip_code with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Zip_code with id " + req.params.id
        });
      }
    } else res.send({ message: `Zip_code was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Zip_code.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Zip_codes."
      });
    else res.send({ message: `All Zip_codes were deleted successfully!` });
  });
};
