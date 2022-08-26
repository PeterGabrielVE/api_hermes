const sql = require("./db.js");
const Interpreter= function(interpreter) {

  this.int_first_name= interpreter.int_first_name;
  this.int_last_name= interpreter.int_last_name;
  this.int_company_name= interpreter.int_company_name;
  this.int_contact_number= interpreter.int_contact_number;
  this.int_phone= interpreter.int_phone;
  this.int_email= interpreter.int_email;
  this.int_language_document= interpreter.int_language_document;
  this.int_translation_document= interpreter.int_translation_document;
  this.int_translation_date= interpreter.int_translation_date;
  this.customer= interpreter.customer;
  this.int_service_requested= interpreter.int_service_requested;
  this.int_type_request= interpreter.int_type_request;
  this.int_billing_address= interpreter.int_billing_address;
  this.int_city_address= interpreter.int_city_address;
  this.int_state_address= interpreter.int_state_address;
  this.int_zipcode_address= interpreter.int_zipcode_address;
  this.int_birthday= interpreter.int_birthday;
  this.int_file= interpreter.int_file;
  this.int_po_number= interpreter.int_po_number;
  this.int_language_needed= interpreter.int_language_needed;
  this.int_hours= interpreter.int_hours;
  this.int_phone_2= interpreter.int_phone_2;
  this.int_record_claim= interpreter.int_record_claim;
  this.int_gender= interpreter.int_gender;
  this.int_notes= interpreter.int_notes;
  this.int_telephonic_date= interpreter.int_telephonic_date;
  this.int_tel_lep_name= interpreter.int_tel_lep_name;
  this.int_tel_lep_phone= interpreter.int_tel_lep_phone;
  this.int_tel_call_be= interpreter.int_tel_call_be;
  this.int_tel_initial= interpreter.int_tel_initial;
  this.int_training_date= interpreter.int_training_date;
  this.status= interpreter.status;
};

Interpreter.create = (newInterpreter, result) => {
  sql.query("INSERT INTO Interpreters SET ?", newInterpreter, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Interpreter: ", { id: res.insertId, ...newInterpreter });
    result(null, { id: res.insertId, ...newInterpreter });
  });
};

Interpreter.findById = (id, result) => {
  sql.query(`SELECT * FROM interpreters WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Interpreter: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Interpreter.getAll = (title, result) => {
  let query = "SELECT * FROM interpreters";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Interpreters: ", res);
    result(null, res);
  });
};

Interpreter.getAllPublished = result => {
  sql.query("SELECT * FROM interpreters", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Interpreters: ", res);
    result(null, res);
  });
};

Interpreter.updateById = (id, Interpreter, result) => {
  sql.query(
    "UPDATE Interpreters SET title = ?, description = ?, published = ? WHERE id = ?",
    [Interpreter.id, id],
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

      console.log("updated Interpreter: ", { id: id, ...interpreter });
      result(null, { id: id, ...interpreter });
    }
  );
};

Interpreter.remove = (id, result) => {
  sql.query("DELETE FROM Interpreters WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Interpreter with id: ", id);
    result(null, res);
  });
};

Interpreter.removeAll = result => {
  sql.query("DELETE FROM Interpreters", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Interpreters`);
    result(null, res);
  });
};

module.exports = Interpreter;
