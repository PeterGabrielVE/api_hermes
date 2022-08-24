const Customer = require("../models/customer.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const customer = new Customer({
    Cus_First_Name : req.body.Cus_First_Name ,
    Cus_Middle_Name : req.body.Cus_Middle_Name ,
    Cus_Last_Name : req.body.Cus_Last_Name ,
    Cus_Company_Name : req.body.Cus_Company_Name ,
    Cus_Billing_Street_Address_1: req.body.Cus_Billing_Street_Address_1,
    Cus_Billing_Street_Address_2: req.body.Cus_Billing_Street_Address_2,
    Cus_Billing_City: req.body.Cus_Billing_City,
    Cus_Billing_State: req.body.Cus_Billing_State,
    Cus_Billing_Zip: req.body.Cus_Billing_Zip,
    Cus_Notes: req.body.Cus_Notes,
    Cus_Billing_Notes : req.body.Cus_Billing_Notes ,
    Cus_Service : req.body.Cus_Service ,
    Cus_Attachments: req.body.Cus_Attachments,
    Cus_Billing_Term : req.body.Cus_Billing_Term ,
    Cus_Phone_Number: req.body.Cus_Phone_Number,
    Cus_Fax_Number: req.body.Cus_Fax_Number,
    Cus_Phone_Other : req.body.Cus_Phone_Other ,
    Cus_WebSite : req.body.Cus_WebSite ,
    Cus_Email_Address : req.body.Cus_Email_Address ,
    Cus_LL_Wiki : req.body.Cus_LL_Wiki ,
    Cus_Status: req.body.Cus_Status,
    Cus_Fullname: req.body.Cus_Fullname,
    attachments: req.body.attachments, 
    ext_customer: req.body.ext_customer, 
  });

  Customer.create(customer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

 Customer.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Customers."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Customer.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Customer.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Customers."
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

  Customer.updateById(
    req.params.id,
    new Customer(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Customer.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.id
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Customer.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Customers."
      });
    else res.send({ message: `All Customers were deleted successfully!` });
  });
};
