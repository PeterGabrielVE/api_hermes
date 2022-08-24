const Customer_service_state = require("../models/customer_service_state.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const customer_service_state = new Customer_service_state({
    customer_id: req.body.customer_id,
    state_id: req.body.state_id,
    service_id: req.body.service_id,
  });

  Customer_service_state.create(customer_service_state, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer_service_state."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Customer_service_state.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Customer_service_states."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Customer_service_state.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer_service_state with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer_service_state with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Customer_service_state.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Customer_service_state."
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

  Customer_service_state.updateById(
    req.params.id,
    new Customer_service_state(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer_service_state with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer_service_state with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Customer_service_state.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer_service_state with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer_service_state with id " + req.params.id
        });
      }
    } else res.send({ message: `Customer_service_state was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Customer_service_state.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Customer_service_states."
      });
    else res.send({ message: `All Customer_service_states were deleted successfully!` });
  });
};
