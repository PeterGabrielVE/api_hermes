const sql = require("./db.js");
const Qualificatio = function(qualificatio) {
  this.type = qualificatio.type;
};

Qualificatio.create = (newQualificatio, result) => {
  sql.query("INSERT INTO Qualification SET ?", newQualificatio, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Qualificatio: ", { id: res.insertId, ...newQualificatio });
    result(null, { id: res.insertId, ...newQualificatio });
  });
};

Qualificatio.findById = (id, result) => {
  sql.query(`SELECT * FROM qualificatios WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Qualificatio: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Invoice with the id
    result({ kind: "not_found" }, null);
  });
};

Qualificatio.getAll = (title, result) => {
  let query = "SELECT * FROM qualification";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Qualification: ", res);
    result(null, res);
  });
};

Qualificatio.getAllPublished = result => {
  sql.query("SELECT * FROM qualification", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Qualification: ", res);
    result(null, res);
  });
};

Qualificatio.updateById = (id, Qualificatio, result) => {
  sql.query(
    "UPDATE Qualification SET title = ?, description = ?, published = ? WHERE id = ?",
    [Qualificatio.id, id],
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

      console.log("updated Qualificatio: ", { id: id, ...qualificatio });
      result(null, { id: id, ...qualificatio });
    }
  );
};

Qualificatio.remove = (id, result) => {
  sql.query("DELETE FROM Qualification WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Qualificatio with id: ", id);
    result(null, res);
  });
};

Qualificatio.removeAll = result => {
  sql.query("DELETE FROM Qualification", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Qualification`);
    result(null, res);
  });
};

module.exports = Qualificatio;
