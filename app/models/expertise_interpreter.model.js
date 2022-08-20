const sql = require("./db.js");
const Expertise_interpreter = function(expertise_interpreter) {
  this.title = expertise_interpreter.id;
};

Expertise_interpreter.create = (newExpertise_interpreter, result) => {
  sql.query("INSERT INTO Expertise_interpreters SET ?", newExpertise_interpreter, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Expertise_interpreter: ", { id: res.insertId, ...newExpertise_interpreter });
    result(null, { id: res.insertId, ...newExpertise_interpreter });
  });
};

Expertise_interpreter.findById = (id, result) => {
  sql.query(`SELECT * FROM expertise_interpreters WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Expertise_interpreter: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Invoice with the id
    result({ kind: "not_found" }, null);
  });
};

Expertise_interpreter.getAll = (title, result) => {
  let query = "SELECT * FROM expertise_interpreters";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Expertise_interpreters: ", res);
    result(null, res);
  });
};

Expertise_interpreter.getAllPublished = result => {
  sql.query("SELECT * FROM expertise_interpreters", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Expertise_interpreters: ", res);
    result(null, res);
  });
};
Expertise_interpreter.updateById = (id, Expertise_interpreter, result) => {
  sql.query(
    "UPDATE Expertise_interpreters SET title = ?, description = ?, published = ? WHERE id = ?",
    [Expertise_interpreter.id, id],
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

      console.log("updated Expertise_interpreter: ", { id: id, ...expertise_interpreter });
      result(null, { id: id, ...expertise_interpreter });
    }
  );
};

Expertise_interpreter.remove = (id, result) => {
  sql.query("DELETE FROM Expertise_interpreters WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Expertise_interpreter with id: ", id);
    result(null, res);
  });
};

Expertise_interpreter.removeAll = result => {
  sql.query("DELETE FROM Expertise_interpreters", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows}Expertise_interpreters`);
    result(null, res);
  });
};

module.exports = Expertise_interpreter;
