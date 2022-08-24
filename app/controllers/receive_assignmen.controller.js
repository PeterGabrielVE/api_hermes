const Receive_assignmen = require("../models/receive_assignmen.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const receive_assignmen = new Receive_assignmen({
    jobs_id : req.body.jobs_id ,
    date_receive: req.body.date_receive,
    start_date: req.body.start_date,
    start_hour: req.body.start_hour,
    end_date: req.body.end_date,
    end_hour: req.body.end_hour,
    total_encounter_hours: req.body.total_encounter_hours,
    total_encounter_minutes: req.body.total_encounter_minutes,
    total_encounter_pages: req.body.total_encounter_pages,
    total_encounter_words: req.body.total_encounter_words,
    total_encounter_days: req.body.total_encounter_days,
    total_encounter_classes: req.body.total_encounter_classes,
    parking_tolls	: req.body.parking_tolls	,
    rate_mileage: req.body.rate_mileage,
    miles: req.body.miles,
    total_mileage: req.body.total_mileage,
    attachment_parking_tolls: req.body.attachment_parking_tolls,
    attachment_form: req.body.attachment_form,
    reported_problem: req.body.reported_problem,
    outcome: req.body.outcome,
  });

  Receive_assignmen.create(receive_assignmen, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Receive_assignmen."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Receive_assignmen.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Receive_assignment."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Receive_assignmen.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Receive_assignmen with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Receive_assignmen with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Receive_assignmen.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Receive_assignment."
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

  Receive_assignmen.updateById(
    req.params.id,
    new Receive_assignmen(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Receive_assignmen with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Receive_assignmen with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Receive_assignmen.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Receive_assignmen with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Receive_assignmen with id " + req.params.id
        });
      }
    } else res.send({ message: `Receive_assignmen was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Receive_assignmen.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Receive_assignment."
      });
    else res.send({ message: `All Receive_assignment were deleted successfully!` });
  });
};
