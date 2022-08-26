const sql = require("./db.js");
const Language_service_offered = function(language_service_offered) {

  this.Language_ID = language_service_offered.Language_ID ;
  this.Service_Offered_ID = language_service_offered.Service_Offered_ID ;
  this.Interpreter_ID = language_service_offered.Interpreter_ID ;
  this.service_request_field_id = language_service_offered.service_request_field_id ;
  this.expertise_interpreters_id= language_service_offered.expertise_interpreters_id;
  this.Per_Minute= language_service_offered.Per_Minute;
  this.Per_Hour= language_service_offered.Per_Hour;
  this.Mid_Day= language_service_offered.Mid_Day;
  this.Full_Day= language_service_offered.Full_Day;
  this.Per_Mile= language_service_offered.Per_Mile;
  this.Per_Word= language_service_offered.Per_Word;
  this.Per_Page= language_service_offered.Per_Page;
  this.Per_Project= language_service_offered.Per_Project;
  this.Per_Day= language_service_offered.Per_Day;
  this.Per_Class= language_service_offered.Per_Class;
  this.Minimum= language_service_offered.Minimum;
  this.Repetition= language_service_offered.Repetition;
  this.Rush_Jobs= language_service_offered.Rush_Jobs;
  this.Rush_Per_Word= language_service_offered.Rush_Per_Word;
  this.Rush_Per_Page= language_service_offered.Rush_Per_Page;
  this.Rush_Per_Hour= language_service_offered.Rush_Per_Hour;
  this.Rush_Repetition= language_service_offered.Rush_Repetition;
  this.Rush_Minimum_Charge= language_service_offered.Rush_Minimum_Charge;
  this.Late_Cancelation= language_service_offered.Late_Cancelation;
  this.Cancelation_Hours= language_service_offered.Cancelation_Hours;
  this.Travel_Time= language_service_offered.Travel_Time;
  this.No_Show= language_service_offered.No_Show;
  this.Notes= language_service_offered.Notes;
};

Language_service_offered.create = (newLanguage_service_offered, result) => {
  sql.query("INSERT INTO Language_service_offereds SET ?", newLanguage_service_offered, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Language_service_offered: ", { id: res.insertId, ...newLanguage_service_offered });
    result(null, { id: res.insertId, ...newLanguage_service_offered });
  });
};

Language_service_offered.findById = (id, result) => {
  sql.query(`SELECT * FROM language_service_offereds WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Language_service_offered: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Language_service_offered.getAll = (title, result) => {
  let query = "SELECT * FROM language_service_offereds";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Language_service_offereds: ", res);
    result(null, res);
  });
};

Language_service_offered.getAllPublished = result => {
  sql.query("SELECT * FROM language_service_offereds", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Language_service_offereds: ", res);
    result(null, res);
  });
};

Language_service_offered.updateById = (id, Language_service_offered, result) => {
  sql.query(
    "UPDATE Language_service_offereds SET title = ?, description = ?, published = ? WHERE id = ?",
    [Language_service_offered.id, id],
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

      console.log("updated Language_service_offered: ", { id: id, ...language_service_offered });
      result(null, { id: id, ...language_service_offered });
    }
  );
};

Language_service_offered.remove = (id, result) => {
  sql.query("DELETE FROM Language_service_offereds WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Language_service_offered with id: ", id);
    result(null, res);
  });
};

Language_service_offered.removeAll = result => {
  sql.query("DELETE FROM Language_service_offereds", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Language_service_offereds`);
    result(null, res);
  });
};

module.exports = Language_service_offered;
