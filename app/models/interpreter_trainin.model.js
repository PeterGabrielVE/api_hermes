const sql = require("./db.js");
const Interpreter_trainin = function(interpreter_trainin) {
  this.title = interpreter_trainin.id;
};

Interpreter_trainin.create = (newInterpreter_trainin, result) => {
  sql.query("INSERT INTO Interpreter_training SET ?", newInterpreter_trainin, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Interpreter_trainin: ", { id: res.insertId, ...newInterpreter_trainin });
    result(null, { id: res.insertId, ...newInterpreter_trainin });
  });
};

Interpreter_trainin.findById = (id, result) => {
  sql.query(`SELECT * FROM interpreter_training WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Interpreter_trainin: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Interpreter_trainin.getAll = (title, result) => {
  let query = "SELECT * FROM interpreter_training";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Interpreter_training: ", res);
    result(null, res);
  });
};

Interpreter_trainin.getAllPublished = result => {
  sql.query("SELECT * FROM interpreter_training", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Interpreter_training: ", res);
    result(null, res);
  });
};

Interpreter_trainin.updateById = (id, Interpreter_trainin, result) => {
  sql.query(
    "UPDATE Interpreter_training SET title = ?, description = ?, published = ? WHERE id = ?",
    [Interpreter_trainin.id, id],
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

      console.log("updated Interpreter_trainin: ", { id: id, ...interpreter_trainin });
      result(null, { id: id, ...interpreter_trainin });
    }
  );
};

Interpreter_trainin.remove = (id, result) => {
  sql.query("DELETE FROM Interpreter_training WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Interpreter_trainin with id: ", id);
    result(null, res);
  });
};

Interpreter_trainin.removeAll = result => {
  sql.query("DELETE FROM Interpreter_training", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Interpreter_training`);
    result(null, res);
  });
};

module.exports = Interpreter_trainin;
