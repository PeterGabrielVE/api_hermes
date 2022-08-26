const sql = require("./db.js");
const Chat_room = function(chat_room) {
  this.name = chat_room.name;
  this.created_at = chat_room.created_at;
  this.updated_at = chat_room.updated_at;
  
};

Chat_room.create = (newChat_room, result) => {
  sql.query("INSERT INTO Chat_rooms SET ?", newChat_room, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Chat_room: ", { id: res.insertId, ...newChat_room });
    result(null, { id: res.insertId, ...newChat_room });
  });
};

Chat_room.findById = (id, result) => {
  sql.query(`SELECT * FROM chat_rooms WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Chat_room: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Chat_room.getAll = (title, result) => {
  let query = "SELECT * FROM chat_rooms";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Chat_rooms: ", res);
    result(null, res);
  });
};

Chat_room.getAllPublished = result => {
  sql.query("SELECT * FROM chat_rooms", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Chat_rooms: ", res);
    result(null, res);
  });
};

Chat_room.updateById = (id, Chat_room, result) => {
  sql.query(
    "UPDATE Chat_rooms SET title = ?, description = ?, published = ? WHERE id = ?",
    [Chat_room.id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Chat_room: ", { id: id, ...chat_room });
      result(null, { id: id, ...chat_room });
    }
  );
};

Chat_room.remove = (id, result) => {
  sql.query("DELETE FROM Chat_rooms WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Chat_room with id: ", id);
    result(null, res);
  });
};

Chat_room.removeAll = result => {
  sql.query("DELETE FROM Chat_rooms", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Chat_rooms`);
    result(null, res);
  });
};

module.exports = Chat_room;