const Job = require("../models/job.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const job = new Job({
    Job_Request_Date: req.body.Job_Request_Date,
    Jobs_Job_Name : req.body.Jobs_Job_Name ,
    Jobs_Type: req.body.Jobs_Type,
    Jobs_Special_Request : req.body.Jobs_Special_Request ,
    Jobs_LEP_Name : req.body.Jobs_LEP_Name ,
    Jobs_LEP_Phone: req.body.Jobs_LEP_Phone,
    Jobs_LEP_Record_Number: req.body.Jobs_LEP_Record_Number,
    Jobs_Language_Requested : req.body.Jobs_Language_Requested ,
    Jobs_Customers_First: req.body.Jobs_Customers_First,
    Jobs_Customers_Last : req.body.Jobs_Customers_Last ,
    Jobs_Customers_PO_Number: req.body.Jobs_Customers_PO_Number,
    Jobs_Assignment_Provider_Name : req.body.Jobs_Assignment_Provider_Name ,
    Jobs_Assignment_Location: req.body.Jobs_Assignment_Location,
    Jobs_Assignment_Department : req.body.Jobs_Assignment_Department ,
    Jobs_Assignment_Contact_Person : req.body.Jobs_Assignment_Contact_Person ,
    Jobs_Assignment_Phone_Number: req.body.Jobs_Assignment_Phone_Number,
    Jobs_Assignment_Email: req.body.Jobs_Assignment_Email,
    Jobs_Assignment_Street_Address_1: req.body.Jobs_Assignment_Street_Address_1,
    Jobs_Assignment_Street_Address_2: req.body.Jobs_Assignment_Street_Address_2,
    Jobs_Assignment_State: req.body.Jobs_Assignment_State,
    Jobs_Assignment_City: req.body.Jobs_Assignment_City,
    Jobs_Assignment_Zip: req.body.Jobs_Assignment_Zip,
    Jobs_Start_Time: req.body.Jobs_Start_Time,
    Jobs_Start_Date: req.body.Jobs_Start_Date,
    Jobs_Start_Hour: req.body.Jobs_Start_Hour,
    Jobs_End_Time: req.body.Jobs_End_Time,
    Jobs_End_Date: req.body.Jobs_End_Date,
    Jobs_End_Hour: req.body.Jobs_End_Hour,
    Jobs_Notes : req.body.Jobs_Notes ,
    Jobs_Notes_Post : req.body.Jobs_Notes_Post ,
    Jobs_Attachments: req.body.Jobs_Attachments,
    Job_Fullfillment_Notes : req.body.Job_Fullfillment_Notes ,
    Job_Assignment_Dpto: req.body.Job_Assignment_Dpto,
    job_service_id: req.body.job_service_id,
    job_field_id: req.body.job_field_id,
    outcome: req.body.outcome,
    jobs_description_2: req.body.jobs_description_2,
  });

  Job.create(job, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Job."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Job.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Jobs."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Job.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Job with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Job with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Job.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Jobs."
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

  Job.updateById(
    req.params.id,
    new Job(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Job with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Job with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Job.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Job with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Job with id " + req.params.id
        });
      }
    } else res.send({ message: `Job was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Job.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Jobs."
      });
    else res.send({ message: `All Jobs were deleted successfully!` });
  });
};
