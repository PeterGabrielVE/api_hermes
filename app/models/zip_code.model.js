const sql = require("./db.js");
const Zip_code = function(zip_code) {
  this.title = zip_code.id;
};

Zip_code.create = (newZip_code, result) => {
  sql.query("INSERT INTO Zip_codes SET ?", newZip_code, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Zip_code: ", { id: res.insertId, ...newZip_code });
    result(null, { id: res.insertId, ...newZip_code });
  });
};

Zip_code.findById = (id, result) => {
  sql.query(`SELECT * FROM zip_codes WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Zip_code: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Zip_code.getAll = (title, result) => {
  let query = "SELECT * FROM zip_codes";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Zip_codes: ", res);
    result(null, res);
  });
};

Zip_code.getAllPublished = result => {
  sql.query("SELECT * FROM zip_codes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Zip_codes: ", res);
    result(null, res);
  });
};

Zip_code.updateById = (id, Zip_code, result) => {
  sql.query(
    "UPDATE Zip_codes SET title = ?, description = ?, published = ? WHERE id = ?",
    [Zip_code.id, id],
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

      console.log("updated Zip_code: ", { id: id, ...zip_code });
      result(null, { id: id, ...zip_code });
    }
  );
};

Zip_code.remove = (id, result) => {
  sql.query("DELETE FROM Zip_codes WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Zip_code with id: ", id);
    result(null, res);
  });
};

Zip_code.removeAll = result => {
  sql.query("DELETE FROM Zip_codes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Zip_codes`);
    result(null, res);
  });
};

module.exports = Zip_code;
