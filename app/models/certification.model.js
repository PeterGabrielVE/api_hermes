const sql = require("./db.js");

// constructor
const Certification = function(certification) {
  this.name = certification.name;
};

Certification.create = (newCertification, result) => {
  sql.query("INSERT INTO Certifications SET ?", newCertification, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Certification: ", { id: res.insertId, ...newCertification });
    result(null, { id: res.insertId, ...newCertification });
  });
};

Certification.findById = (id, result) => {
  sql.query(`SELECT * FROM certifications WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Certification: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Invoice with the id
    result({ kind: "not_found" }, null);
  });
};

Certification.getAll = (title, result) => {
  let query = "SELECT * FROM certifications";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Certifications: ", res);
    result(null, res);
  });
};

Certification.getAllPublished = result => {
  sql.query("SELECT * FROM certifications", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Certifications: ", res);
    result(null, res);
  });
};

Certification.updateById = (id, Certification, result) => {
  sql.query(
    "UPDATE Certifications SET title = ?, description = ?, published = ? WHERE id = ?",
    [Certification.id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Invoice with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Certification: ", { id: id, ...certification });
      result(null, { id: id, ...certification });
    }
  );
};

Certification.remove = (id, result) => {
  sql.query("DELETE FROM Certifications WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Invoice with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Certification with id: ", id);
    result(null, res);
  });
};

Certification.removeAll = result => {
  sql.query("DELETE FROM Certifications", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Certifications`);
    result(null, res);
  });
};

module.exports = Certification;
