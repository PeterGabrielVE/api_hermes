const sql = require("./db.js");
const Interpreters_networ = function(interpreters_networ) {
  this.title = interpreters_networ.id;
};

Interpreters_networ.create = (newInterpreters_networ, result) => {
  sql.query("INSERT INTO Interpreters_network SET ?", newInterpreters_networ, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Interpreters_networ: ", { id: res.insertId, ...newInterpreters_networ });
    result(null, { id: res.insertId, ...newInterpreters_networ });
  });
};

Interpreters_networ.findById = (id, result) => {
  sql.query(`SELECT * FROM Interpreters_network WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Interpreters_networ: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Interpreters_networ.getAll = (title, result) => {
  let query = "SELECT * FROM Interpreters_network";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Interpreters_network: ", res);
    result(null, res);
  });
};

Interpreters_networ.getAllPublished = result => {
  sql.query("SELECT * FROM interpreters_network", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Interpreters_network: ", res);
    result(null, res);
  });
};

Interpreters_networ.updateById = (id, Interpreters_networ, result) => {
  sql.query(
    "UPDATE Interpreters_network SET title = ?, description = ?, published = ? WHERE id = ?",
    [Interpreters_networ.id, id],
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

      console.log("updated Interpreters_networ: ", { id: id, ...interpreters_networ });
      result(null, { id: id, ...interpreters_networ });
    }
  );
};

Interpreters_networ.remove = (id, result) => {
  sql.query("DELETE FROM Interpreters_network WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Interpreters_networ with id: ", id);
    result(null, res);
  });
};

Interpreters_networ.removeAll = result => {
  sql.query("DELETE FROM Interpreters_network", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Interpreters_network`);
    result(null, res);
  });
};

module.exports = Interpreters_networ;
