const sql = require("./db.js");
const Type_phone = function(type_phone) {
  this.title = type_phone.id;
};

Type_phone.create = (newType_phone, result) => {
  sql.query("INSERT INTO Type_phones SET ?", newType_phone, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Type_phone: ", { id: res.insertId, ...newType_phone });
    result(null, { id: res.insertId, ...newType_phone });
  });
};

Type_phone.findById = (id, result) => {
  sql.query(`SELECT * FROM type_phones WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Type_phone: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Type_phone.getAll = (title, result) => {
  let query = "SELECT * FROM type_phones";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Type_phones: ", res);
    result(null, res);
  });
};

Type_phone.getAllPublished = result => {
  sql.query("SELECT * FROM type_phones", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Type_phones: ", res);
    result(null, res);
  });
};

Type_phone.updateById = (id, InType_phoneoice, result) => {
  sql.query(
    "UPDATE Type_phones SET title = ?, description = ?, published = ? WHERE id = ?",
    [Type_phone.id, id],
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

      console.log("updated Type_phone: ", { id: id, ...type_phone });
      result(null, { id: id, ...type_phone });
    }
  );
};

Type_phone.remove = (id, result) => {
  sql.query("DELETE FROM Type_phones WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Type_phone with id: ", id);
    result(null, res);
  });
};

Type_phone.removeAll = result => {
  sql.query("DELETE FROM Type_phones", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Type_phones`);
    result(null, res);
  });
};

module.exports = Type_phone;
