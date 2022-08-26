const sql = require("./db.js");
const Permission = function(permission) {
  this.name = permission.name;
  this.guard_name = permission.guard_name;
  this.created_at = permission.created_at;
  this.updated_at = permission.updated_at;
};

Permission.create = (newPermission, result) => {
  sql.query("INSERT INTO Permissions SET ?", newPermission, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Permission: ", { id: res.insertId, ...newPermission });
    result(null, { id: res.insertId, ...newPermission });
  });
};

Permission.findById = (id, result) => {
  sql.query(`SELECT * FROM permissions WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Permission: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Permission.getAll = (title, result) => {
  let query = "SELECT * FROM permissions";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Permissions: ", res);
    result(null, res);
  });
};

Permission.getAllPublished = result => {
  sql.query("SELECT * FROM permissions", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Permissions: ", res);
    result(null, res);
  });
};

Permission.updateById = (id, Permission, result) => {
  sql.query(
    "UPDATE Permissions SET title = ?, description = ?, published = ? WHERE id = ?",
    [Permission.id, id],
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

      console.log("updated Permission: ", { id: id, ...permission });
      result(null, { id: id, ...permission });
    }
  );
};

Permission.remove = (id, result) => {
  sql.query("DELETE FROM Permissions WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Permission with id: ", id);
    result(null, res);
  });
};

Permission.removeAll = result => {
  sql.query("DELETE FROM Permissions", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Permissions`);
    result(null, res);
  });
};

module.exports = Permission;
