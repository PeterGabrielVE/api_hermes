const sql = require("./db.js");

// constructor
const Assignments_statu = function(Assignments_statu) {
  this.name = Assignments_statu.name;
};

Assignments_statu.create = (newAssignments_statu, result) => {
  sql.query("INSERT INTO Assignments_status SET ?", newAssignments_statu, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Assignments_statu: ", { id: res.insertId, ...newAssignments_statu });
    result(null, { id: res.insertId, ...newAssignments_statu });
  });
};

Assignments_statu.findById = (id, result) => {
  sql.query(`SELECT * FROM Assignments_status WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Assignments_statu: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found  with the id
    result({ kind: "not_found" }, null);
  });
};

Assignments_statu.getAll = (title, result) => {
  let query = "SELECT * FROM Assignments_status";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Assignments_status: ", res);
    result(null, res);
  });
};

Assignments_statu.getAllPublished = result => {
  sql.query("SELECT * FROM Assignments_status", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Assignments_status: ", res);
    result(null, res);
  });
};

Assignments_statu.updateById = (id,Assignments_statu, result) => {
  sql.query(
    "UPDATE Assignments_status SET title = ?, description = ?, published = ? WHERE id = ?",
    [Assignments_statu.id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Agencie with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Assignments_statu: ", { id: id, ...Assignments_statu });
      result(null, { id: id, ...Assignments_statu });
    }
  );
};

Assignments_statu.remove = (id, result) => {
  sql.query("DELETE FROM Assignments_status WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Agencie with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Assignments_statu with id: ", id);
    result(null, res);
  });
};

Assignments_statu.removeAll = result => {
  sql.query("DELETE FROM Assignments_status", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Assignments_status`);
    result(null, res);
  });
};

module.exports = Assignments_statu;