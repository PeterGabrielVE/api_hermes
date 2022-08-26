const sql = require("./db.js");

// constructor
const Contacts_custome = function(contacts_custome) {
  
  this.first_name= contacts_custome.first_name;
  this.second_name= contacts_custome.second_name;
  this.last_name= contacts_custome.last_name;
  this.title= contacts_custome.title;
  this.deparment= contacts_custome.deparment;
  this.telphone= contacts_custome.telphone;
  this.ext= contacts_custome.ext;
  this.email= contacts_custome.email;
  this.address= contacts_custome.address;
  this.note= contacts_custome.note;
  this.customer_id = contacts_custome.customer_id ;
  this.type_id = contacts_custome.type_id ;
  this.person_id = contacts_custome.person_id ;
  this.deleted_at= contacts_custome.deleted_at;
};

Contacts_custome.create = (newContacts_custome, result) => {
  sql.query("INSERT INTO Contacts_customer SET ?", newContacts_custome, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created Contacts_custome: ", { id: res.insertId, ...newContacts_custome });
    result(null, { id: res.insertId, ...newContacts_custome });
  });
};

Contacts_custome.findById = (id, result) => {
  sql.query(`SELECT * FROM contacts_customer WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Contacts_custome: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Contacts_custome.getAll = (title, result) => {
  let query = "SELECT * FROM contacts_customer";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Contacts_customer: ", res);
    result(null, res);
  });
};

Contacts_custome.getAllPublished = result => {
  sql.query("SELECT * FROM contacts_customer", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Contacts_customer: ", res);
    result(null, res);
  });
};

Contacts_custome.updateById = (id, Contacts_custome, result) => {
  sql.query(
    "UPDATE Contacts_customer SET title = ?, description = ?, published = ? WHERE id = ?",
    [Contacts_custome.id, id],
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

      console.log("updated Contacts_custome: ", { id: id, ...contacts_custome });
      result(null, { id: id, ...contacts_custome });
    }
  );
};

Contacts_custome.remove = (id, result) => {
  sql.query("DELETE FROM Contacts_customer WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Contacts_custome with id: ", id);
    result(null, res);
  });
};

Contacts_custome.removeAll = result => {
  sql.query("DELETE FROM Contacts_customer", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Contacts_customer`);
    result(null, res);
  });
};

module.exports = Contacts_custome;
