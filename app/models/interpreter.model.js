const sql = require("./db.js");
const Interpreter= function(interpreter) {
  this.title = interpreter.id;
};

Interpreter.create = (newInterpreter, result) => {
  sql.query("INSERT INTO Interpreters SET ?", newInterpreter, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Interpreter: ", { id: res.insertId, ...newInterpreter });
    result(null, { id: res.insertId, ...newInterpreter });
  });
};

Interpreter.findById = (id, result) => {
  sql.query(`SELECT * FROM interpreters WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Interpreter: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Interpreter.getAll = (title, result) => {
  let query = "SELECT * FROM interpreters";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Interpreters: ", res);
    result(null, res);
  });
};

Interpreter.getAllPublished = result => {
  sql.query("SELECT * FROM interpreters", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Interpreters: ", res);
    result(null, res);
  });
};

Interpreter.updateById = (id, Interpreter, result) => {
  sql.query(
    "UPDATE Interpreters SET title = ?, description = ?, published = ? WHERE id = ?",
    [Interpreter.id, id],
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

      console.log("updated Interpreter: ", { id: id, ...interpreter });
      result(null, { id: id, ...interpreter });
    }
  );
};

Interpreter.remove = (id, result) => {
  sql.query("DELETE FROM Interpreters WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Interpreter with id: ", id);
    result(null, res);
  });
};

Interpreter.removeAll = result => {
  sql.query("DELETE FROM Interpreters", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Interpreters`);
    result(null, res);
  });
};

module.exports = Interpreter;
