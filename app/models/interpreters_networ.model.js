const sql = require("./db.js");
const Interpreters_networ = function(interpreters_networ) {

  this.int_prefix= interpreters_networ.int_prefix;
  this.int_first_name= interpreters_networ.int_first_name;
  this.int_last_name= interpreters_networ.int_last_name;
  this.int_gender= interpreters_networ.int_gender;
  this.int_age= interpreters_networ.int_age;
  this.int_address= interpreters_networ.int_address;
  this.int_home_phone= interpreters_networ.int_home_phone;
  this.int_phone_ext= interpreters_networ.int_phone_ext;
  this.int_fax= interpreters_networ.int_fax;
  this.int_email_address= interpreters_networ.int_email_address;
  this.int_primary_language= interpreters_networ.int_primary_language;
  this.int_other_language= interpreters_networ.int_other_language;
  this.int_year_school= interpreters_networ.int_year_school;
  this.int_high_education= interpreters_networ.int_high_education;
  this.int_training_before= interpreters_networ.int_training_before;
  this.int_last_year= interpreters_networ.int_last_year;
  this.int_org_training= interpreters_networ.int_org_training;
  this.int_experience_interpreting= interpreters_networ.int_experience_interpreting;
  this.int_resumen= interpreters_networ.int_resumen;
  this.int_notes= interpreters_networ.int_notes;
  this.int_type= interpreters_networ.int_type;
  this.int_status= interpreters_networ.int_status;
  this.int_certificate= interpreters_networ.int_certificate;
  this.int_time_contact= interpreters_networ.int_time_contact;
  this.int_service_off= interpreters_networ.int_service_off;
};

Interpreters_networ.create = (newInterpreters_networ, result) => {
  sql.query("INSERT INTO Interpreters_network SET ?", newInterpreters_networ, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Interpreters_networ: ", { id: res.insertId, ...newInterpreters_networ });
    result(null, { id: res.insertId, ...newInterpreters_networ });
  });
};

Interpreters_networ.findById = (id, result) => {
  sql.query(`SELECT * FROM Interpreters_network WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Interpreters_networ: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Interpreters_networ.getAll = (title, result) => {
  let query = "SELECT * FROM Interpreters_network";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Interpreters_network: ", res);
    result(null, res);
  });
};

Interpreters_networ.getAllPublished = result => {
  sql.query("SELECT * FROM interpreters_network", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Interpreters_network: ", res);
    result(null, res);
  });
};

Interpreters_networ.updateById = (id, Interpreters_networ, result) => {
  sql.query(
    "UPDATE Interpreters_network SET title = ?, description = ?, published = ? WHERE id = ?",
    [Interpreters_networ.id, id],
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

      console.log("updated Interpreters_networ: ", { id: id, ...interpreters_networ });
      result(null, { id: id, ...interpreters_networ });
    }
  );
};

Interpreters_networ.remove = (id, result) => {
  sql.query("DELETE FROM Interpreters_network WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Interpreters_networ with id: ", id);
    result(null, res);
  });
};

Interpreters_networ.removeAll = result => {
  sql.query("DELETE FROM Interpreters_network", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Interpreters_network`);
    result(null, res);
  });
};

module.exports = Interpreters_networ;
