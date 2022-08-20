const sql = require("./db.js");

// constructor
const Chat_message = function(chat_message) {
  this.title = chat_message.id;
};

Chat_message.create = (newChat_message, result) => {
  sql.query("INSERT INTO Chat_messages SET ?", newChat_message, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Chat_message: ", { id: res.insertId, ...newChat_message });
    result(null, { id: res.insertId, ...newChat_message });
  });
};

Chat_message.findById = (id, result) => {
  sql.query(`SELECT * FROM chat_messages WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Chat_message: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Invoice with the id
    result({ kind: "not_found" }, null);
  });
};

Chat_message.getAll = (title, result) => {
  let query = "SELECT * FROM chat_messages";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Chat_messages: ", res);
    result(null, res);
  });
};

Chat_message.getAllPublished = result => {
  sql.query("SELECT * FROM chat_messages", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Chat_messages: ", res);
    result(null, res);
  });
};

Chat_message.updateById = (id, Chat_message, result) => {
  sql.query(
    "UPDATE Chat_messages SET title = ?, description = ?, published = ? WHERE id = ?",
    [Chat_message.id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Invoice with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Chat_message: ", { id: id, ...chat_message });
      result(null, { id: id, ...chat_message });
    }
  );
};

Chat_message.remove = (id, result) => {
  sql.query("DELETE FROM Chat_messages WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Invoice with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Chat_message with id: ", id);
    result(null, res);
  });
};

Chat_message.removeAll = result => {
  sql.query("DELETE FROM Chat_messages", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Chat_messages`);
    result(null, res);
  });
};

module.exports = Chat_message;