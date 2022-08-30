const Service = require("../models/service.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
 
  const service = new Service({
    Service_Name: req.body.Service_Name,
    Service_State: req.body.Service_State,
    Service_Code: req.body.Service_Code,
    Service_Rate: req.body.Service_Rate,
    Service_Cus_Number: req.body.Service_Cus_Number,
    Service_Type: req.body.Service_Type,
    attachments: req.body.attachments,
    customer_id: req.body.customer_id,
    language_id: req.body.language_id,
    services_offereds_id: req.body.services_offereds_id,
  });

  Service.create(service, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Service."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Service.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Services."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Service.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Service with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Service with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Service.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Services."
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

  Service.updateById(
    req.params.id,
    new Service(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Service with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Service with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Service.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Service with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Service with id " + req.params.id
        });
      }
    } else res.send({ message: `Service was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Service.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Services."
      });
    else res.send({ message: `All Services were deleted successfully!` });
  });
};
