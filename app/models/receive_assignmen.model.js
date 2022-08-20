const sql = require("./db.js");
const Receive_assignmen = function(receive_assignmen) {
  this.title = receive_assignmen.id;
};

Receive_assignmen.create = (newReceive_assignmen, result) => {
  sql.query("INSERT INTO Receive_assignment SET ?", newReceive_assignmen, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Receive_assignmen: ", { id: res.insertId, ...newReceive_assignmen });
    result(null, { id: res.insertId, ...newReceive_assignmen });
  });
};

Receive_assignmen.findById = (id, result) => {
  sql.query(`SELECT * FROM receive_assignment WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Receive_assignmen: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Receive_assignmen.getAll = (title, result) => {
  let query = "SELECT * FROM Receive_assignment";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Receive_assignment: ", res);
    result(null, res);
  });
};

Receive_assignmen.getAllPublished = result => {
  sql.query("SELECT * FROM receive_assignment", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Receive_assignment: ", res);
    result(null, res);
  });
};

Receive_assignmen.updateById = (id, Receive_assignmen, result) => {
  sql.query(
    "UPDATE Receive_assignment SET title = ?, description = ?, published = ? WHERE id = ?",
    [Receive_assignmen.id, id],
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

      console.log("updated Receive_assignmen: ", { id: id, ...receive_assignmen });
      result(null, { id: id, ...receive_assignmen });
    }
  );
};

Receive_assignmen.remove = (id, result) => {
  sql.query("DELETE FROM Receive_assignment WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Receive_assignmen with id: ", id);
    result(null, res);
  });
};

Receive_assignmen.removeAll = result => {
  sql.query("DELETE FROM Receive_assignment", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Receive_assignment`);
    result(null, res);
  });
};

module.exports = Receive_assignmen;
