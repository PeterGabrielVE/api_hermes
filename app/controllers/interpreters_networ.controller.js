const Interpreters_networ = require("../models/interpreters_networ.model.js");

// Create and Save a new Invoice
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const interpreters_networ = new Interpreters_networ({
    int_prefix: req.body.int_prefix,
    int_first_name: req.body.int_first_name,
    int_last_name: req.body.int_last_name,
    int_gender: req.body.int_gender,
    int_age: req.body.int_age,
    int_address: req.body.int_address,
    int_home_phone: req.body.int_home_phone,
    int_phone_ext: req.body.int_phone_ext,
    int_fax: req.body.int_fax,
    int_email_address: req.body.int_email_address,
    int_primary_language: req.body.int_primary_language,
    int_other_language: req.body.int_other_language,
    int_year_school: req.body.int_year_school,
    int_high_education: req.body.int_high_education,
    int_training_before: req.body.int_training_before,
    int_last_year: req.body.int_last_year,
    int_org_training: req.body.int_org_training,
    int_experience_interpreting: req.body.int_experience_interpreting,
    int_resumen: req.body.int_resumen,
    int_notes: req.body.int_notes,
    int_type: req.body.int_type,
    int_status: req.body.int_status,
    int_certificate: req.body.int_certificate,
    int_time_contact: req.body.int_time_contact,
    int_service_off: req.body.int_service_off,
  });
  Interpreters_networ.create(interpreters_networ, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Interpreters_networ."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Interpreters_networ.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Interpreters_network."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Interpreters_networ.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Interpreters_networ with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Interpreters_networ with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Interpreters_networ.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Interpreters_network."
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

  Interpreters_networ.updateById(
    req.params.id,
    new Interpreters_networ(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Interpreters_networ with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Interpreters_networ with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Interpreters_networ.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Interpreters_networ with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Interpreters_networ with id " + req.params.id
        });
      }
    } else res.send({ message: `Interpreters_networ was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
 Interpreters_networ.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Interpreters_network."
      });
    else res.send({ message: `All Interpreters_network were deleted successfully!` });
  });
};
