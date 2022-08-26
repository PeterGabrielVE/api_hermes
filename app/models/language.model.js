const sql = require("./db.js");
const Language = function(language) {
  this.language = language.language;
};

Language.create = (newLanguage, result) => {
  sql.query("INSERT INTO Languages SET ?", newLanguage, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Language: ", { id: res.insertId, ...newLanguage });
    result(null, { id: res.insertId, ...newLanguage });
  });
};

Language.findById = (id, result) => {
  sql.query(`SELECT * FROM languages WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Language: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Invoice with the id
    result({ kind: "not_found" }, null);
  });
};

Language.getAll = (title, result) => {
  let query = "SELECT * FROM languages";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Languages: ", res);
    result(null, res);
  });
};

Language.getAllPublished = result => {
  sql.query("SELECT * FROM languages", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Languages: ", res);
    result(null, res);
  });
};

Language.updateById = (id, Language, result) => {
  sql.query(
    "UPDATE Languages SET title = ?, description = ?, published = ? WHERE id = ?",
    [Language.id, id],
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

      console.log("updated Language: ", { id: id, ...language });
      result(null, { id: id, ...language });
    }
  );
};

Language.remove = (id, result) => {
  sql.query("DELETE FROM Languages WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Language with id: ", id);
    result(null, res);
  });
};

Language.removeAll = result => {
  sql.query("DELETE FROM Languages", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Languages`);
    result(null, res);
  });
};

module.exports = Language;
