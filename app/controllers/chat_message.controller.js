const Chat_message = require("../models/chat_message.model.js");

// Create and Save a new Invoice
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Invoice
  const chat_message = new Chat_message({
    chat_room_id: req.body.chat_room_id,
    user_id: req.body.user_id,
    message: req.body.message,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
    
  });

  // Save Invoice in the database
  Chat_message.create(chat_message, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Chat_message."
      });
    else res.send(data);
  });
};

// Retrieve all Invoices from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Chat_message.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Chat_messages."
      });
    else res.send(data);
  });
};

// Find a single Invoice by Id
exports.findOne = (req, res) => {
    Chat_message.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Chat_message with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Chat_message with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Invoices
exports.findAllPublished = (req, res) => {
    Chat_message.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Chat_messages."
      });
    else res.send(data);
  });
};

// Update a Invoice identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Chat_message.updateById(
    req.params.id,
    new Chat_message(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Chat_message with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Chat_message with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Invoice with the specified id in the request
exports.delete = (req, res) => {
    Chat_message.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Chat_message with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Chat_message with id " + req.params.id
        });
      }
    } else res.send({ message: `Chat_message was deleted successfully!` });
  });
};

// Delete all Invoices from the database.
exports.deleteAll = (req, res) => {
    Chat_message.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Chat_messages."
      });
    else res.send({ message: `All Chat_messages were deleted successfully!` });
  });
};
