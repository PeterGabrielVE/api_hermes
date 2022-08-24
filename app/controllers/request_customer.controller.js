const Request_customer = require("../models/request_customer.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const request_customer = new Request_customer({
    Job_Name: req.body.Job_Name,
    Cus_Last_Name: req.body.Cus_Last_Name,
    Cus_Company_Name: req.body.Cus_Company_Name,
    Cus_Contact_Number: req.body.Cus_Contact_Number,
    ext_customer: req.body.ext_customer,
    Cus_Email: req.body.Cus_Email,
    Cus_Language_Needed: req.body.Cus_Language_Needed,
    Cus_Location: req.body.Cus_Location,
    Cus_City: req.body.Cus_City,
    Cus_State: req.body.Cus_State,
    Cus_Zip: req.body.Cus_Zip,
    Cus_Translation_Date: req.body.Cus_Translation_Date,
    Cus_Hours: req.body.Cus_Hours,
    Cus_Phone_Number: req.body.Cus_Phone_Number,
    Cus_Record_Claim: req.body.Cus_Record_Claim,
    Cus_Gender: req.body.Cus_Gender,
    Cus_Notes: req.body.Cus_Notes,
    Cus_Language_Document: req.body.Cus_Language_Document,
    Cus_Translation_Document	: req.body.Cus_Translation_Document	,
    Cus_Customer: req.body.Cus_Customer,
    Cus_Service_Request: req.body.Cus_Service_Request,
    Cus_Type_Request: req.body.Cus_Type_Request,
    Cus_Billing_Address: req.body.Cus_Billing_Address,
    Cus_Birthday: req.body.Cus_Birthday,
    Cus_File: req.body.Cus_File,
    Cus_Po_Number: req.body.Cus_Po_Number,
    Cus_Phone_2: req.body.Cus_Phone_2,
    Cus_Telephonic_Date: req.body.Cus_Telephonic_Date,
    Cus_tel_lep_name: req.body.Cus_tel_lep_name,
    Cus_tel_lep_phone: req.body.Cus_tel_lep_phone,
    Cus_Tel_Call_Be: req.body.Cus_Tel_Call_Be,
    Cus_Tel_Initial: req.body.Cus_Tel_Initial,
    Cus_Training_Date: req.body.Cus_Training_Date,
    Cus_Status: req.body.Cus_Status,
    Cus_Description: req.body.Cus_Description,
    Cus_Service_Start: req.body.Cus_Service_Start,
    Cus_Service_End: req.body.Cus_Service_End,
    Cus_Hours_end: req.body.Cus_Hours_end,
    Cus_Address: req.body.Cus_Address,
    Job_Address: req.body.Job_Address,
    Cus_Requester_Name: req.body.Cus_Requester_Name,
    Job_Departament: req.body.Job_Departament,
    Job_Apt_Suite: req.body.Job_Apt_Suite,
    Job_City: req.body.Job_City,
    Job_State: req.body.Job_State,
    Job_Assig_Cust_Email: req.body.Job_Assig_Cust_Email,
    Job_Contact_Person: req.body.Job_Contact_Person,
    Job_Provider_Name: req.body.Job_Provider_Name,
    Job_Phone: req.body.Job_Phone,
    Job_Zip_Code: req.body.Job_Zip_Code,
    Cus_b_term: req.body.Cus_b_term,
    Cus_field: req.body.Cus_field,

  });

  Request_customer.create(request_customer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Request_customer."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Request_customer.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Request_customers."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Request_customer.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Request_customer with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Request_customer with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Request_customer.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Request_customers."
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

  Request_customer.updateById(
    req.params.id,
    new Request_customer(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Request_customer with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Request_customer with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Request_customer.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Request_customer with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Request_customer with id " + req.params.id
        });
      }
    } else res.send({ message: `Request_customer was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Request_customer.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Request_customers."
      });
    else res.send({ message: `All Request_customers were deleted successfully!` });
  });
};
