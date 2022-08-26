const sql = require("./db.js");
const Interpreter_certification_state = function(interpreter_certification_state) {
  
  this.interpreter_id  = interpreter_certification_state.interpreter_id ;
  this.interpreter_certifications_id  = interpreter_certification_state.interpreter_certifications_id ;
  this.state_id  = interpreter_certification_state.state_id ;
  
};

Interpreter_certification_state.create = (newInterpreter_certification_state, result) => {
  sql.query("INSERT INTO Interpreter_certification_states SET ?", newInterpreter_certification_state, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Interpreter_certification_state: ", { id: res.insertId, ...newInterpreter_certification_state });
    result(null, { id: res.insertId, ...newInterpreter_certification_state });
  });
};

Interpreter_certification_state.findById = (id, result) => {
  sql.query(`SELECT * FROM interpreter_certification_states WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Interpreter_certification_state: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Interpreter_certification_state.getAll = (title, result) => {
  let query = "SELECT * FROM interpreter_certification_states";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Interpreter_certification_states: ", res);
    result(null, res);
  });
};

Interpreter_certification_state.getAllPublished = result => {
  sql.query("SELECT * FROM interpreter_certification_states", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Interpreter_certification_states: ", res);
    result(null, res);
  });
};

Interpreter_certification_state.updateById = (id, Interpreter_certification_state, result) => {
  sql.query(
    "UPDATE Interpreter_certification_states SET title = ?, description = ?, published = ? WHERE id = ?",
    [Interpreter_certification_state.id, id],
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

      console.log("updated Interpreter_certification_state: ", { id: id, ...interpreter_certification_state });
      result(null, { id: id, ...interpreter_certification_state });
    }
  );
};

Interpreter_certification_state.remove = (id, result) => {
  sql.query("DELETE FROM Interpreter_certification_states WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Interpreter_certification_state with id: ", id);
    result(null, res);
  });
};

Interpreter_certification_state.removeAll = result => {
  sql.query("DELETE FROM Interpreter_certification_states", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Interpreter_certification_states`);
    result(null, res);
  });
};

module.exports = Interpreter_certification_state;
