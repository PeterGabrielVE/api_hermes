const Services_requests_statu = require("../models/services_requests_statu.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const services_requests_statu = new Services_requests_statu({
    name: req.body.name,
  });

  Services_requests_statu.create(services_requests_statu, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Services_requests_statu."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Services_requests_statu.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Services_requests_status."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Services_requests_statu.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Services_requests_statu with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Services_requests_statu with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Services_requests_statu.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Services_requests_status."
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

  Services_requests_statu.updateById(
    req.params.id,
    new Services_requests_statu(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Services_requests_statu with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Services_requests_statu with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Services_requests_statu.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Services_requests_statu with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Services_requests_statu with id " + req.params.id
        });
      }
    } else res.send({ message: `Services_requests_statu was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Services_requests_statu.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Services_requests_status."
      });
    else res.send({ message: `All Services_requests_status were deleted successfully!` });
  });
};
