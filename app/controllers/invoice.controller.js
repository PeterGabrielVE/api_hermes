const Invoice = require("../models/invoice.model.js");

// Create and Save a new Invoice
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const invoice = new Invoice({
    Invoice_Status: req.body.Invoice_Status,
    Invoice_Jobs_Number : req.body.Invoice_Jobs_Number,
    Invoice_Job_Cus_Number : req.body.Invoice_Job_Cus_Number,
    Invoice_Cus_Company_Name : req.body.Invoice_Cus_Company_Name,
    Invoice_Cus_Billing_Company_Street_1 : req.body.Invoice_Cus_Billing_Company_Street_1,
    Invoice_Cus_Billing_Company_Street_2 : req.body.Invoice_Cus_Billing_Company_Street_2,

    Invoice_Cus_Billing_City : req.body.Invoice_Cus_Billing_City,
    Invoice_Cus_Billing_State : req.body.Invoice_Cus_Billing_State,
    Invoice_Cus_Billing_Zip : req.body.Invoice_Cus_Billing_Zip,
    Invoice_Cus_Billing_Term : req.body.Invoice_Cus_Billing_Term,
    Invoice_Cus_Billing_E_mail : req.body.Invoice_Cus_Billing_E_mail,

    Invoice_Subtotal : req.body.Invoice_Subtotal,
    Invoice_Credits : req.body.Invoice_Credits,
    Invoice_Total : req.body.Invoice_Total,
    Invoice_Orig_Amount : req.body.Invoice_Orig_Amount,
    Invoice_Amount_Due : req.body.Invoice_Amount_Due,

    Invoice_Payment : req.body.Invoice_Payment,
    Invoice_Attachments : req.body.Invoice_Attachments,
    Invoice_Date : req.body.Invoice_Date,
    Invoice_Due_Date : req.body.Invoice_Due_Date,
    Invoice_Notes : req.body.Invoice_Notes,
  
  });

  Invoice.create(invoice, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Invoice."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Invoice.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Invoices."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Invoice.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Invoice with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Invoice with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
  Invoice.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Invoices."
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

  Invoice.updateById(
    req.params.id,
    new Invoice(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Invoice with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Invoice with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Invoice.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Invoice with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Invoice with id " + req.params.id
        });
      }
    } else res.send({ message: `Invoice was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Invoice.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Invoices."
      });
    else res.send({ message: `All Invoices were deleted successfully!` });
  });
};
