const Chat_room = require("../models/chat_room.model.js");


exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const chat_room = new Chat_room({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  Chat_room.create(chat_room, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Chat_room."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Chat_room.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Chat_rooms."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Chat_room.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Chat_room with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Chat_room with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Chat_room.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Chat_rooms."
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

  Chat_room.updateById(
    req.params.id,
    new Chat_room(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Chat_room with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Chat_room with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Chat_room.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Chat_room with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Chat_room with id " + req.params.id
        });
      }
    } else res.send({ message: `Chat_room was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Chat_room.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Chat_rooms."
      });
    else res.send({ message: `All Chat_rooms were deleted successfully!` });
  });
};
