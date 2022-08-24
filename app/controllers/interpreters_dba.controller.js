const Interpreters_dba = require("../models/interpreters_dba.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const interpreters_dba = new Interpreters_dba({
    contractors_id : req.body.contractors_id ,
    person_id : req.body.person_id ,
    dba: req.body.dba,
    birthdate: req.body.birthdate,
    gender: req.body.gender,
    education_Degree: req.body.education_Degree,
    years_school: req.body.years_school,
    initial: req.body.initial,
    training_Certifications: req.body.training_Certifications,
    agency_Currently_Working: req.body.agency_Currently_Working,
    prefix: req.body.prefix,
  });

  Interpreters_dba.create(interpreters_dba, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Interpreters_dba."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Interpreters_dba.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Interpreters_dbas."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Interpreters_dba.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Interpreters_dba with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Interpreters_dba with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Interpreters_dba.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Interpreters_dbas."
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

  Interpreters_dba.updateById(
    req.params.id,
    new Interpreters_dba(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Interpreters_dba with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Interpreters_dba with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Interpreters_dba.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Interpreters_dba with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Interpreters_dba with id " + req.params.id
        });
      }
    } else res.send({ message: `Interpreters_dba was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Interpreters_dba.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Interpreters_dbas."
      });
    else res.send({ message: `All Interpreters_dbas were deleted successfully!` });
  });
};
