const Language_service_offered = require("../models/language_service_offered.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const language_service_offered = new Language_service_offered({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  Language_service_offered.create(language_service_offered, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Language_service_offered."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Language_service_offered.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Language_service_offereds."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Language_service_offered.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Language_service_offered with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Language_service_offered with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Language_service_offered.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Language_service_offereds."
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

  Language_service_offered.updateById(
    req.params.id,
    new Language_service_offered(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Language_service_offered with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Language_service_offered with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Language_service_offered.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Language_service_offered with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Language_service_offered with id " + req.params.id
        });
      }
    } else res.send({ message: `Language_service_offered was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Language_service_offered.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Language_service_offereds."
      });
    else res.send({ message: `All Language_service_offereds were deleted successfully!` });
  });
};
