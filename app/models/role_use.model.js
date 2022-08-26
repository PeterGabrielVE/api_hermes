const sql = require("./db.js");
const Role_use = function(role_use) {
  this.role_id = role_use.role_id;
  this.user_id = role_use.user_id;
};

Role_use.create = (newRole_use, result) => {
  sql.query("INSERT INTO Role_user SET ?", newRole_use, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Role_use: ", { id: res.insertId, ...newRole_use });
    result(null, { id: res.insertId, ...newRole_use });
  });
};

Role_use.findById = (id, result) => {
  sql.query(`SELECT * FROM role_user WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Role_use: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Invoice with the id
    result({ kind: "not_found" }, null);
  });
};

Role_use.getAll = (title, result) => {
  let query = "SELECT * FROM role_user";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Role_user: ", res);
    result(null, res);
  });
};

Role_use.getAllPublished = result => {
  sql.query("SELECT * FROM role_user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Role_user: ", res);
    result(null, res);
  });
};

Role_use.updateById = (id, Role_use, result) => {
  sql.query(
    "UPDATE Role_user SET title = ?, description = ?, published = ? WHERE id = ?",
    [Role_use.id, id],
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

      console.log("updated Role_use: ", { id: id, ...role_use });
      result(null, { id: id, ...role_use });
    }
  );
};

Role_use.remove = (id, result) => {
  sql.query("DELETE FROM Role_user WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Role_use with id: ", id);
    result(null, res);
  });
};

Role_use.removeAll = result => {
  sql.query("DELETE FROM Role_user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Role_user`);
    result(null, res);
  });
};

module.exports = Role_use;
