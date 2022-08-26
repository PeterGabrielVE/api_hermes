const sql = require("./db.js");
const Password_reset = function(password_reset) {
  this.email = password_reset.email;
  this.token = password_reset.token;
  this.created_at = password_reset.created_at;
};

Password_reset.create = (newPassword_reset, result) => {
  sql.query("INSERT INTO Password_resets SET ?", newPassword_reset, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Password_reset: ", { id: res.insertId, ...newPassword_reset });
    result(null, { id: res.insertId, ...newPassword_reset });
  });
};

Password_reset.findById = (id, result) => {
  sql.query(`SELECT * FROM password_resets WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Password_reset: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Invoice with the id
    result({ kind: "not_found" }, null);
  });
};

Password_reset.getAll = (title, result) => {
  let query = "SELECT * FROM password_resets";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Password_resets: ", res);
    result(null, res);
  });
};

Password_reset.getAllPublished = result => {
  sql.query("SELECT * FROM password_resets", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Password_resets: ", res);
    result(null, res);
  });
};

Password_reset.updateById = (id, Password_reset, result) => {
  sql.query(
    "UPDATE Password_resets SET title = ?, description = ?, published = ? WHERE id = ?",
    [Password_reset.id, id],
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

      console.log("updated Password_reset: ", { id: id, ...password_reset });
      result(null, { id: id, ...password_reset });
    }
  );
};

Password_reset.remove = (id, result) => {
  sql.query("DELETE FROM Password_resets WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Password_reset with id: ", id);
    result(null, res);
  });
};

Password_reset.removeAll = result => {
  sql.query("DELETE FROM Password_resets", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Password_resets`);
    result(null, res);
  });
};

module.exports = Password_reset;
