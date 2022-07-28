const sql = require("./db.js");
const Interpreter_afiliation = function(interpreter_afiliation) {
  this.title = interpreter_afiliation.id;
};

Interpreter_afiliation.create = (newInterpreter_afiliation, result) => {
  sql.query("INSERT INTO Interpreter_afiliations SET ?", newInterpreter_afiliation, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Interpreter_afiliation: ", { id: res.insertId, ...newInterpreter_afiliation });
    result(null, { id: res.insertId, ...newInterpreter_afiliation });
  });
};

Interpreter_afiliation.findById = (id, result) => {
  sql.query(`SELECT * FROM interpreter_afiliations WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Interpreter_afiliation: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Interpreter_afiliation.getAll = (title, result) => {
  let query = "SELECT * FROM interpreter_afiliations";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Interpreter_afiliations: ", res);
    result(null, res);
  });
};

Interpreter_afiliation.getAllPublished = result => {
  sql.query("SELECT * FROM interpreter_afiliations", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Interpreter_afiliations: ", res);
    result(null, res);
  });
};

Interpreter_afiliation.updateById = (id, Interpreter_afiliation, result) => {
  sql.query(
    "UPDATE Interpreter_afiliations SET title = ?, description = ?, published = ? WHERE id = ?",
    [Interpreter_afiliation.id, id],
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

      console.log("updated Interpreter_afiliation: ", { id: id, ...interpreter_afiliation });
      result(null, { id: id, ...interpreter_afiliation });
    }
  );
};

Interpreter_afiliation.remove = (id, result) => {
  sql.query("DELETE FROM Interpreter_afiliations WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Interpreter_afiliation with id: ", id);
    result(null, res);
  });
};

Interpreter_afiliation.removeAll = result => {
  sql.query("DELETE FROM Interpreter_afiliations", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Interpreter_afiliations`);
    result(null, res);
  });
};

module.exports = Interpreter_afiliation;
