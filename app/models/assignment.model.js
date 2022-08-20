const sql = require("./db.js");

// constructor
const Assignment = function(Assignment) {
  this.title = 	Assignment.id;
};

Assignment.create = (newAssignment, result) => {
  sql.query("INSERT INTO Assignments SET ?", newAssignment, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Assignment: ", { id: res.insertId, ...newAssignment });
    result(null, { id: res.insertId, ...newAssignment });
  });
};

Assignment.findById = (id, result) => {
  sql.query(`SELECT * FROM Assignments WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Assignment: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found  with the id
    result({ kind: "not_found" }, null);
  });
};

Assignment.getAll = (title, result) => {
  let query = "SELECT * FROM Assignments";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Assignments: ", res);
    result(null, res);
  });
};

Assignment.getAllPublished = result => {
  sql.query("SELECT * FROM Assignments", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Assignments: ", res);
    result(null, res);
  });
};

Assignment.updateById = (id,Assignment, result) => {
  sql.query(
    "UPDATE Assignments SET title = ?, description = ?, published = ? WHERE id = ?",
    [Assignment.id, id],
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

      console.log("updated Assignment: ", { id: id, ...Assignment });
      result(null, { id: id, ...Assignment });
    }
  );
};

Assignment.remove = (id, result) => {
  sql.query("DELETE FROM Assignments WHERE id = ?", id, (err, res) => {
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

    console.log("deleted Assignment with id: ", id);
    result(null, res);
  });
};

Assignment.removeAll = result => {
  sql.query("DELETE FROM Assignments", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Assignments`);
    result(null, res);
  });
};

module.exports = Assignment;
