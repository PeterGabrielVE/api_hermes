const Job_order = require("../models/job_order.model.js");

// Create and Save a new Invoice
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const job_order = new Job_order({
    jobs_id : req.body.jobs_id ,
    Jobs_Status: req.body.Jobs_Status,
    customers_id : req.body.customers_id ,
    Jobs_Customers_Company: req.body.Jobs_Customers_Company,
    Jobs_Service_Name : req.body.Jobs_Service_Name ,
    Jobs_Service_Code: req.body.Jobs_Service_Code,
    Jobs_Service_Name_Rate: req.body.Jobs_Service_Name_Rate,
    Jobs_Service_Hours_Estimate: req.body.Jobs_Service_Hours_Estimate,
    Jobs_Service_Hours_Estimate_Cost: req.body.Jobs_Service_Hours_Estimate_Cost,
    Jobs_Service_Mileage_Code: req.body.Jobs_Service_Mileage_Code,
    Jobs_Service_Mileage_Name : req.body.Jobs_Service_Mileage_Name ,
    Jobs_Service_Mileage_Rate: req.body.Jobs_Service_Mileage_Rate,
    Jobs_Service_Mileage_Estimate: req.body.Jobs_Service_Mileage_Estimate,
    Jobs_Service_Mileage_Cost_Estimate: req.body.Jobs_Service_Mileage_Cost_Estimate,
    Jobs_Travel_Time: req.body.Jobs_Travel_Time,
    Jobs_Travel_Time_Code: req.body.Jobs_Travel_Time_Code,
    Jobs_Travel_Time_Name : req.body.Jobs_Travel_Time_Name ,
    Jobs_Travel_Time_Rate: req.body.Jobs_Travel_Time_Rate,
    Jobs_Travel_Time_Estimate_Cost: req.body.Jobs_Travel_Time_Estimate_Cost,
    Jobs_Cancelation_Fee: req.body.Jobs_Cancelation_Fee,
    Jobs_Parking_Fees: req.body.Jobs_Parking_Fees,
    Jobs_No_Show: req.body.Jobs_No_Show,
    Jobs_Service_Total_Estimate: req.body.Jobs_Service_Total_Estimate,
    attachment_cust: req.body.attachment_cust,
    outcome: req.body.outcome,
    invoice_id: req.body.invoice_id,
  });

  Job_order.create(job_order, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Job_order."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Job_order.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Job_orders."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Job_order.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Job_order with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Job_order with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Job_order.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Job_orders."
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

  Job_order.updateById(
    req.params.id,
    new Job_order(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Job_order with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Job_order with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Job_order.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Job_order with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Job_order with id " + req.params.id
        });
      }
    } else res.send({ message: `Job_order was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Job_order.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Job_orders."
      });
    else res.send({ message: `All Job_orders were deleted successfully!` });
  });
};
