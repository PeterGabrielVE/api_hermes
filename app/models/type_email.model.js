const sql = require("./db.js");
const Type_email = function(type_email) {
  this.name = type_email.name;
};

Type_email.create = (newType_email, result) => {
  sql.query("INSERT INTO Type_emails SET ?", newType_email, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Type_email: ", { id: res.insertId, ...newType_email });
    result(null, { id: res.insertId, ...newType_email });
  });
};

Type_email.findById = (id, result) => {
  sql.query(`SELECT * FROM type_emails WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Type_email: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Type_email.getAll = (title, result) => {
  let query = "SELECT * FROM type_emails";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Type_emails: ", res);
    result(null, res);
  });
};

Type_email.getAllPublished = result => {
  sql.query("SELECT * FROM type_emails", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Type_emails: ", res);
    result(null, res);
  });
};

Type_email.updateById = (id, Type_email, result) => {
  sql.query(
    "UPDATE Type_emails SET title = ?, description = ?, published = ? WHERE id = ?",
    [Type_email.id, id],
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

      console.log("updated Type_email: ", { id: id, ...type_email });
      result(null, { id: id, ...type_email });
    }
  );
};

Type_email.remove = (id, result) => {
  sql.query("DELETE FROM Type_emails WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Type_email with id: ", id);
    result(null, res);
  });
};

Type_email.removeAll = result => {
  sql.query("DELETE FROM Type_emails", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Type_emails`);
    result(null, res);
  });
};

module.exports = Type_email;
