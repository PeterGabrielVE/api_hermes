const sql = require("./db.js");
const Interpreters_dba = function(interpreters_dba) {
  
  this.contractors_id  = interpreters_dba.contractors_id ;
  this.person_id  = interpreters_dba.person_id ;
  this.dba = interpreters_dba.dba;
  this.birthdate = interpreters_dba.birthdate;
  this.gender = interpreters_dba.gender;
  this.education_Degree = interpreters_dba.education_Degree;
  this.years_school = interpreters_dba.years_school;
  this.initial = interpreters_dba.initial;
  this.training_Certifications = interpreters_dba.training_Certifications;
  this.agency_Currently_Working = interpreters_dba.agency_Currently_Working;
  this.prefix = interpreters_dba.prefix;
};

Interpreters_dba.create = (newInterpreters_dba, result) => {
  sql.query("INSERT INTO Interpreters_dbas SET ?", newInterpreters_dba, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Interpreters_dba: ", { id: res.insertId, ...newInterpreters_dba });
    result(null, { id: res.insertId, ...newInterpreters_dba });
  });
};

Interpreters_dba.findById = (id, result) => {
  sql.query(`SELECT * FROM interpreters_dbas WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Interpreters_dba: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Interpreters_dba.getAll = (title, result) => {
  let query = "SELECT * FROM interpreters_dbas";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Interpreters_dbas: ", res);
    result(null, res);
  });
};

Interpreters_dba.getAllPublished = result => {
  sql.query("SELECT * FROM interpreters_dbas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Interpreters_dbas: ", res);
    result(null, res);
  });
};

Interpreters_dba.updateById = (id, Interpreters_dba, result) => {
  sql.query(
    "UPDATE Interpreters_dbas SET title = ?, description = ?, published = ? WHERE id = ?",
    [Interpreters_dba.id, id],
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

      console.log("updated Interpreters_dba: ", { id: id, ...interpreters_dba });
      result(null, { id: id, ...interpreters_dba });
    }
  );
};

Interpreters_dba.remove = (id, result) => {
  sql.query("DELETE FROM Interpreters_dbas WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Interpreters_dba with id: ", id);
    result(null, res);
  });
};

Interpreters_dba.removeAll = result => {
  sql.query("DELETE FROM Interpreters_dbas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Interpreters_dbas`);
    result(null, res);
  });
};

module.exports = Interpreters_dba;
