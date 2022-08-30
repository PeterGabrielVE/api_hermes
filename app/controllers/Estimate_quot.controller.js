const Estimate_quot = require("../models/estimate_quot.model.js");

// Create and Save a new Invoice
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const estimate_quot = new Estimate_quot({
    customer_id : req.body.customer_id ,
    interpreter_id : req.body.interpreter_id ,
    service_request_id: req.body.service_request_id,
    job_id: req.body.job_id,
    service_email: req.body.service_email,
    service_avb_yes: req.body.service_avb_yes,
    service_avb_no: req.body.service_avb_no,
    service_avb_nvr: req.body.service_avb_nvr,
    service_request_status : req.body.service_request_status ,
    service_name : req.body.service_name ,
    service_code: req.body.service_code,
    service_rate: req.body.service_rate,
    service_rate_hrs: req.body.service_rate_hrs,
    service_rate_cost: req.body.service_rate_cost,
    mileage_name : req.body.mileage_name ,
    mileage_code: req.body.mileage_code,
    mileage_rate: req.body.mileage_rate,
    mileage_mls: req.body.mileage_mls,
    mileage_cost: req.body.mileage_cost,
    travel_name : req.body.travel_name ,
    travel_code: req.body.travel_code,
    travel_time: req.body.travel_time,
    travel_hrs: req.body.travel_hrs,
    travel_cost: req.body.travel_cost,
    no_show: req.body.no_show,
    cancelation: req.body.cancelation,
    total	: req.body.total	,
    special_instructions: req.body.special_instructions,
    total_onsite: req.body.total_onsite,
    total_perhour: req.body.total_perhour,
    total_perminute: req.body.total_perminute,
    total_perword: req.body.total_perword,
    total_perpage: req.body.total_perpage,
    total_perproject: req.body.total_perproject,
    total_perday: req.body.total_perday,
    total_perclass: req.body.total_perclass,
    pages: req.body.pages,
    words: req.body.words,
    minimum: req.body.minimum,
    dist_permile: req.body.dist_permile,
    per_hour: req.body.per_hour,
    per_minute: req.body.per_minute,
    per_page: req.body.per_page,
    per_word: req.body.per_word,
    per_day: req.body.per_day,
    per_class: req.body.per_class,
    int_cancelation: req.body.int_cancelation,
    int_no_show: req.body.int_no_show,
    int_travel_time_hours: req.body.int_travel_time_hours,
    int_travel_time_rate: req.body.int_travel_time_rate,
    int_total_travel_time: req.body.int_total_travel_time,
    per_mile: req.body.per_mile,
    dist: req.body.dist,
  });

  Estimate_quot.create(estimate_quot, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Estimate_quot."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Estimate_quot.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Estimate_quote."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Estimate_quot.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Estimate_quot with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Estimate_quot with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Estimate_quot.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Estimate_quote."
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

  Estimate_quot.updateById(
    req.params.id,
    new Estimate_quot(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Estimate_quot with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Estimate_quot with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Estimate_quot.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Estimate_quot with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Estimate_quot with id " + req.params.id
        });
      }
    } else res.send({ message: `Estimate_quot was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Estimate_quot.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Estimate_quote."
      });
    else res.send({ message: `All Estimate_quote were deleted successfully!` });
  });
};
