const sql = require("./db.js");

// constructor
const Agencie = function(Agencie) {
  this.title = Agencie.id;
};

Agencie.create = (newAgencie, result) => {
  sql.query("INSERT INTO Agencies SET ?", newAgencie, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Agencie: ", { id: res.insertId, ...newAgencie });
    result(null, { id: res.insertId, ...newAgencie });
  });
};

Agencie.findById = (id, result) => {
  sql.query(`SELECT * FROM Agencies WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Agencie: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Agencie with the id
    result({ kind: "not_found" }, null);
  });
};

Agencie.getAll = (title, result) => {
  let query = "SELECT * FROM Agencies";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Agencies: ", res);
    result(null, res);
  });
};

Agencie.getAllPublished = result => {
  sql.query("SELECT * FROM Agencies", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Agencies: ", res);
    result(null, res);
  });
};

Agencie.updateById = (id, Agencie, result) => {
  sql.query(
    "UPDATE Agencies SET title = ?, description = ?, published = ? WHERE id = ?",
    [Agencie.id, id],
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

      console.log("updated Agencie: ", { id: id, ...Agencie });
      result(null, { id: id, ...Agencie });
    }
  );
};

Agencie.remove = (id, result) => {
  sql.query("DELETE FROM Agencies WHERE id = ?", id, (err, res) => {
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

    console.log("deleted Agencie with id: ", id);
    result(null, res);
  });
};

Agencie.removeAll = result => {
  sql.query("DELETE FROM Agencies", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Agencies`);
    result(null, res);
  });
};

module.exports = Agencie;
