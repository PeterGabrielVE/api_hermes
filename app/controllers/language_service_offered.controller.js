const Language_service_offered = require("../models/language_service_offered.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const language_service_offered = new Language_service_offered({
    Language_ID : req.body.Language_ID ,
    Service_Offered_ID : req.body.Service_Offered_ID ,
    Interpreter_ID : req.body.Interpreter_ID ,
    service_request_field_id : req.body.service_request_field_id ,
    expertise_interpreters_id: req.body.expertise_interpreters_id,
    Per_Minute: req.body.Per_Minute,
    Per_Hour: req.body.Per_Hour,
    Mid_Day: req.body.Mid_Day,
    Full_Day: req.body.Full_Day,
    Per_Mile: req.body.Per_Mile,
    Per_Word: req.body.Per_Word,
    Per_Page: req.body.Per_Page,
    Per_Project: req.body.Per_Project,
    Per_Day: req.body.Per_Day,
    Per_Class: req.body.Per_Class,
    Minimum: req.body.Minimum,
    Repetition: req.body.Repetition,
    Rush_Jobs: req.body.Rush_Jobs,
    Rush_Per_Word: req.body.Rush_Per_Word,
    Rush_Per_Page: req.body.Rush_Per_Page,
    Rush_Per_Hour: req.body.Rush_Per_Hour,
    Rush_Repetition: req.body.Rush_Repetition,
    Rush_Minimum_Charge: req.body.Rush_Minimum_Charge,
    Late_Cancelation: req.body.Late_Cancelation,
    Cancelation_Hours: req.body.Cancelation_Hours,
    Travel_Time: req.body.Travel_Time,
    No_Show: req.body.No_Show,
    Notes: req.body.Notes,
  });

  Language_service_offered.create(language_service_offered, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Language_service_offered."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Language_service_offered.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Language_service_offereds."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Language_service_offered.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Language_service_offered with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Language_service_offered with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Language_service_offered.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Language_service_offereds."
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

  Language_service_offered.updateById(
    req.params.id,
    new Language_service_offered(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Language_service_offered with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Language_service_offered with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Language_service_offered.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Language_service_offered with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Language_service_offered with id " + req.params.id
        });
      }
    } else res.send({ message: `Language_service_offered was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Language_service_offered.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Language_service_offereds."
      });
    else res.send({ message: `All Language_service_offereds were deleted successfully!` });
  });
};
