const sql = require("./db.js");
const Intepreters_contact = function(intepreters_contact) {
  this.title = intepreters_contact.id;
};

Intepreters_contact.create = (newIntepreters_contact, result) => {
  sql.query("INSERT INTO Intepreters_contacts SET ?", newIntepreters_contact, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Intepreters_contact: ", { id: res.insertId, ...newIntepreters_contact });
    result(null, { id: res.insertId, ...newIntepreters_contact });
  });
};

Intepreters_contact.findById = (id, result) => {
  sql.query(`SELECT * FROM ntepreters_contacts WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Intepreters_contact: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Invoice with the id
    result({ kind: "not_found" }, null);
  });
};

Intepreters_contact.getAll = (title, result) => {
  let query = "SELECT * FROM intepreters_contacts";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Intepreters_contacts: ", res);
    result(null, res);
  });
};

Intepreters_contact.getAllPublished = result => {
  sql.query("SELECT * FROM intepreters_contacts", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Intepreters_contacts: ", res);
    result(null, res);
  });
};

Intepreters_contact.updateById = (id,Intepreters_contact, result) => {
  sql.query(
    "UPDATE Intepreters_contacts SET title = ?, description = ?, published = ? WHERE id = ?",
    [Intepreters_contact.id, id],
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

      console.log("updated Intepreters_contact: ", { id: id, ...intepreters_contact });
      result(null, { id: id, ...intepreters_contact });
    }
  );
};

Intepreters_contact.remove = (id, result) => {
  sql.query("DELETE FROM Intepreters_contacts WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Intepreters_contact with id: ", id);
    result(null, res);
  });
};

Intepreters_contact.removeAll = result => {
  sql.query("DELETE FROM Intepreters_contacts", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Intepreters_contacts`);
    result(null, res);
  });
};

module.exports = Intepreters_contact;
