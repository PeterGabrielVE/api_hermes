const sql = require("./db.js");
const Contractor = function(contractor) {
  this.title = contractor.id;
};

Contractor.create = (newContractor, result) => {
  sql.query("INSERT INTO Contractors SET ?", newContractor, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Contractor: ", { id: res.insertId, ...newContractor });
    result(null, { id: res.insertId, ...newContractor });
  });
};

Contractor.findById = (id, result) => {
  sql.query(`SELECT * FROM contractors WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Contractor: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Contractor.getAll = (title, result) => {
  let query = "SELECT * FROM contractors";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Contractors: ", res);
    result(null, res);
  });
};

Contractor.getAllPublished = result => {
  sql.query("SELECT * FROM contractors", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Contractors: ", res);
    result(null, res);
  });
};

Contractor.updateById = (id,Contractor, result) => {
  sql.query(
    "UPDATE Contractors SET title = ?, description = ?, published = ? WHERE id = ?",
    [Contractor.id, id],
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

      console.log("updated Contractor: ", { id: id, ...contractor });
      result(null, { id: id, ...contractor });
    }
  );
};

Contractor.remove = (id, result) => {
  sql.query("DELETE FROM Contractors WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Contractor with id: ", id);
    result(null, res);
  });
};

Contractor.removeAll = result => {
  sql.query("DELETE FROM Contractors", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Contractors`);
    result(null, res);
  });
};

module.exports = Contractor;