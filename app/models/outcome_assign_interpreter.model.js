const sql = require("./db.js");
const Outcome_assign_interpreter = function(Outcome_assign_interpreter) {

  this.interpreter_id  = Outcome_assign_interpreter.interpreter_id;
  this.jobs_id  = Outcome_assign_interpreter.jobs_id;
  this.outcome_id  = Outcome_assign_interpreter.outcome_id;
  this.notes = Outcome_assign_interpreter.notes;
};

Outcome_assign_interpreter.create = (newOutcome_assign_interpreter, result) => {
  sql.query("INSERT INTO Outcome_assign_interpreters SET ?", newOutcome_assign_interpreter, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Outcome_assign_interpreter: ", { id: res.insertId, ...newOutcome_assign_interpreter });
    result(null, { id: res.insertId, ...newOutcome_assign_interpreter });
  });
};

Outcome_assign_interpreter.findById = (id, result) => {
  sql.query(`SELECT * FROM Outcome_assign_interpreters WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Outcome_assign_interpreter: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Outcome_assign_interpreter.getAll = (title, result) => {
  let query = "SELECT * FROM Outcome_assign_interpreters";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Outcome_assign_interpreters: ", res);
    result(null, res);
  });
};

Outcome_assign_interpreter.getAllPublished = result => {
  sql.query("SELECT * FROM Outcome_assign_interpreters", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Outcome_assign_interpreters: ", res);
    result(null, res);
  });
};

Outcome_assign_interpreter.updateById = (id, Outcome_assign_interpreter, result) => {
  sql.query(
    "UPDATE Outcome_assign_interpreters SET title = ?, description = ?, published = ? WHERE id = ?",
    [Outcome_assign_interpreter.id, id],
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

      console.log("updated Outcome_assign_interpreter: ", { id: id, ...Outcome_assign_interpreter });
      result(null, { id: id, ...Outcome_assign_interpreter });
    }
  );
};

Outcome_assign_interpreter.remove = (id, result) => {
  sql.query("DELETE FROM Outcome_assign_interpreters WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Outcome_assign_interpreter with id: ", id);
    result(null, res);
  });
};

Outcome_assign_interpreter.removeAll = result => {
  sql.query("DELETE FROM Outcome_assign_interpreters", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Outcome_assign_interpreters`);
    result(null, res);
  });
};

module.exports = Outcome_assign_interpreter;
