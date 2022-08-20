const sql = require("./db.js");
const Language_service_offered = function(language_service_offered) {
  this.title = language_service_offered.id;
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
