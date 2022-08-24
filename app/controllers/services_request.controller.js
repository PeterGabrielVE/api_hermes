const Services_request = require("../models/services_request.model.js");

// Create and Save a new Invoice
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const services_request = new Services_request({
    service_request_status_id : req.body.service_request_status_id ,
    service_requested_id : req.body.service_requested_id ,
    service_type_id : req.body.service_type_id ,
    request_date: req.body.request_date,
    request_field_id : req.body.request_field_id ,
    service_start_date: req.body.service_start_date,
    service_start_hour: req.body.service_start_hour,
    service_end_date: req.body.service_end_date,
    service_end_hour: req.body.service_end_hour,
    cust_phone_number: req.body.cust_phone_number,
    cust_po_number: req.body.cust_po_number,
    address_customer: req.body.address_customer,
    address_city: req.body.address_city,
    address_state: req.body.address_state,
    address_zipcode: req.body.address_zipcode,
    lep_name: req.body.lep_name,
    lep_po_number	: req.body.lep_po_number	,
    lep_record_number: req.body.lep_record_number,
    job_zip_code: req.body.job_zip_code,
    address_job: req.body.address_job,
    address_job2: req.body.address_job2,
    job_city: req.body.job_city,
    job_state: req.body.job_state,
    requester_name: req.body.requester_name,
    distance_radius_jobs: req.body.distance_radius_jobs,
    customer_id : req.body.customer_id ,
    interpreter_id : req.body.interpreter_id ,
    name_job: req.body.name_job,
    dpto_job: req.body.dpto_job,
    phone_job: req.body.phone_job,
    job_departament: req.body.job_departament,
    provider_name: req.body.provider_name,
    email_job: req.body.email_job,
    contact_person: req.body.contact_person,
    service_email: req.body.service_email,
    service_avb_yes: req.body.service_avb_yes,
    service_avb_no: req.body.service_avb_no,
    service_avb_nvr: req.body.service_avb_nvr,
    cus_notes: req.body.cus_notes,
    language_id : req.body.language_id ,
    job_service_id : req.body.job_service_id ,
    estimate_quote_id : req.body.estimate_quote_id ,
    created_by: req.body.created_by,
    worked_by: req.body.worked_by,
    other_email: req.body.other_email,
    qualification_id: req.body.qualification_id,
  });

  Services_request.create(services_request, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Services_request."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Services_request.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Services_requests."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Services_request.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Services_request with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Services_request with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Services_request.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Services_requests."
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

  Services_request.updateById(
    req.params.id,
    new Services_request(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Services_request with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Services_request with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Services_request.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Services_request with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Services_request with id " + req.params.id
        });
      }
    } else res.send({ message: `Services_request was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Services_request.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Services_requests."
      });
    else res.send({ message: `All Services_requests were deleted successfully!` });
  });
};
