const sql = require("./db.js");
const Interpreter_certification = function(interpreter_certification) {
  this.title = interpreter_certification.id;
};

Interpreter_certification.create = (newInterpreter_certification, result) => {
  sql.query("INSERT INTO Interpreter_certifications SET ?", newInterpreter_certification, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Interpreter_certification: ", { id: res.insertId, ...newInterpreter_certification });
    result(null, { id: res.insertId, ...newInterpreter_certification });
  });
};

Interpreter_certification.findById = (id, result) => {
  sql.query(`SELECT * FROM interpreter_certifications WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Interpreter_certification: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Interpreter_certification.getAll = (title, result) => {
  let query = "SELECT * FROM interpreter_certifications";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Interpreter_certifications: ", res);
    result(null, res);
  });
};

Interpreter_certification.getAllPublished = result => {
  sql.query("SELECT * FROM interpreter_certifications", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Interpreter_certifications: ", res);
    result(null, res);
  });
};

Interpreter_certification.updateById = (id, Interpreter_certification, result) => {
  sql.query(
    "UPDATE Interpreter_certifications SET title = ?, description = ?, published = ? WHERE id = ?",
    [Interpreter_certification.id, id],
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

      console.log("updated Interpreter_certification: ", { id: id, ...interpreter_certification });
      result(null, { id: id, ...interpreter_certification });
    }
  );
};

Interpreter_certification.remove = (id, result) => {
  sql.query("DELETE FROM Interpreter_certifications WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Interpreter_certification with id: ", id);
    result(null, res);
  });
};

Interpreter_certification.removeAll = result => {
  sql.query("DELETE FROM Interpreter_certifications", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Interpreter_certifications`);
    result(null, res);
  });
};

module.exports = Interpreter_certification;
