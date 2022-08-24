const Employee = require("../models/employee.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const employee = new Employee({
    person_id: req.body.person_id,
    state: req.body.state,
    city: req.body.city,
    zip: req.body.zip,
    main_email: req.body.main_email,
    main_telephone: req.body.main_telephone,
    Address: req.body.Address,
    county: req.body.county,
    apt_suite: req.body.apt_suite,
  });

 Employee.create(employee, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Employee."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Employee.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Employees."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Employee.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Employee with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Employee with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Employee.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Employees."
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

  Employee.updateById(
    req.params.id,
    new Employee(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Employee with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Employee with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Employee.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Employee with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Employee with id " + req.params.id
        });
      }
    } else res.send({ message: `Employee was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Employee.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Employees."
      });
    else res.send({ message: `All Employees were deleted successfully!` });
  });
};
