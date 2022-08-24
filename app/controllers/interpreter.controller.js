const Interpreter = require("../models/interpreter.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const interpreter = new Interpreter({
    int_first_name: req.body.int_first_name,
    int_last_name: req.body.int_last_name,
    int_company_name: req.body.int_company_name,
    int_contact_number: req.body.int_contact_number,
    int_phone: req.body.int_phone,
    int_email: req.body.int_email,
    int_language_document: req.body.int_language_document,
    int_translation_document: req.body.int_translation_document,
    int_translation_date: req.body.int_translation_date,
    customer: req.body.customer,
    int_service_requested: req.body.int_service_requested,
    int_type_request: req.body.int_type_request,
    int_billing_address: req.body.int_billing_address,
    int_city_address: req.body.int_city_address,
    int_state_address: req.body.int_state_address,
    int_zipcode_address: req.body.int_zipcode_address,
    int_birthday: req.body.int_birthday,
    int_file: req.body.int_file,
    int_po_number: req.body.int_po_number,
    int_language_needed: req.body.int_language_needed,
    int_hours: req.body.int_hours,
    int_phone_2: req.body.int_phone_2,
    int_record_claim: req.body.int_record_claim,
    int_gender: req.body.int_gender,
    int_notes: req.body.int_notes,
    int_telephonic_date: req.body.int_telephonic_date,
    int_tel_lep_name: req.body.int_tel_lep_name,
    int_tel_lep_phone: req.body.int_tel_lep_phone,
    int_tel_call_be: req.body.int_tel_call_be,
    int_tel_initial: req.body.int_tel_initial,
    int_training_date: req.body.int_training_date,
    status: req.body.status,
  });

  Interpreter.create(interpreter, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Interpreter."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Interpreter.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Interpreters."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Interpreter.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Interpreter with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Interpreter with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Interpreter.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Interpreters."
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

  Interpreter.updateById(
    req.params.id,
    new Interpreter(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Interpreter with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Interpreter with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Interpreter.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Interpreter with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Interpreter with id " + req.params.id
        });
      }
    } else res.send({ message: `Interpreter was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Interpreter.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Interpreters."
      });
    else res.send({ message: `All Interpreters were deleted successfully!` });
  });
};
