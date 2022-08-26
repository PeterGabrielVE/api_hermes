const sql = require("./db.js");
const Outcome_interpreter = function(outcome_interpreter) {
  this.name = outcome_interpreter.name;
};

Outcome_interpreter.create = (newOutcome_interpreter, result) => {
  sql.query("INSERT INTO Outcome_interpreters SET ?", newOutcome_interpreter, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Outcome_interpreter: ", { id: res.insertId, ...newOutcome_interpreter });
    result(null, { id: res.insertId, ...newOutcome_interpreter });
  });
};

Outcome_interpreter.findById = (id, result) => {
  sql.query(`SELECT * FROM outcome_interpreters WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Outcome_interpreter: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Invoice with the id
    result({ kind: "not_found" }, null);
  });
};

Outcome_interpreter.getAll = (title, result) => {
  let query = "SELECT * FROM outcome_interpreters";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Outcome_interpreters: ", res);
    result(null, res);
  });
};

Outcome_interpreter.getAllPublished = result => {
  sql.query("SELECT * FROM outcome_interpreters", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Outcome_interpreters: ", res);
    result(null, res);
  });
};

Outcome_interpreter.updateById = (id, Outcome_interpreter, result) => {
  sql.query(
    "UPDATE Outcome_interpreters SET title = ?, description = ?, published = ? WHERE id = ?",
    [Outcome_interpreter.id, id],
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

      console.log("updated Outcome_interpreter: ", { id: id, ...outcome_interpreter });
      result(null, { id: id, ...outcome_interpreter });
    }
  );
};

Outcome_interpreter.remove = (id, result) => {
  sql.query("DELETE FROM Outcome_interpreters WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Outcome_interpreter with id: ", id);
    result(null, res);
  });
};

Outcome_interpreter.removeAll = result => {
  sql.query("DELETE FROM Outcome_interpreters", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Outcome_interpreters`);
    result(null, res);
  });
};

module.exports = Outcome_interpreter;
