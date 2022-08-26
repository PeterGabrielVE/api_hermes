const sql = require("./db.js");
const Peopl = function(peopl) {

  this.id_auto  = peopl.id_auto ;
  this.first_name = peopl.first_name;
  this.last_name = peopl.last_name;
  this.middle_name = peopl.middle_name;
  this.created_at = peopl.created_at;
  this.updated_at = peopl.updated_at;
};

Peopl.create = (newPeopl, result) => {
  sql.query("INSERT INTO Peopls SET ?", newPeopl, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Peopl: ", { id: res.insertId, ...newPeopl });
    result(null, { id: res.insertId, ...newPeopl });
  });
};

Peopl.findById = (id, result) => {
  sql.query(`SELECT * FROM people WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Peopl: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Peopl.getAll = (title, result) => {
  let query = "SELECT * FROM people";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("People: ", res);
    result(null, res);
  });
};

Peopl.getAllPublished = result => {
  sql.query("SELECT * FROM people", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("People: ", res);
    result(null, res);
  });
};

Peopl.updateById = (id, Peopl, result) => {
  sql.query(
    "UPDATE People SET title = ?, description = ?, published = ? WHERE id = ?",
    [Invoice.id, id],
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

      console.log("updated Peopl: ", { id: id, ...peopl });
      result(null, { id: id, ...peopl });
    }
  );
};

Peopl.remove = (id, result) => {
  sql.query("DELETE FROM People WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Peopl with id: ", id);
    result(null, res);
  });
};

Peopl.removeAll = result => {
  sql.query("DELETE FROM People", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} People`);
    result(null, res);
  });
};

module.exports = Peopl;
