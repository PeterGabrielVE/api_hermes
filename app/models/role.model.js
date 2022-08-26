const sql = require("./db.js");
const Role = function(role) {

  this.name = role.name;
  this.description = role.description;
  this.guard_name = role.guard_name;
  this.created_at = role.created_at;
  this.updated_at = role.updated_at;
};

Role.create = (newRole, result) => {
  sql.query("INSERT INTO Roles SET ?", newRole, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Role: ", { id: res.insertId, ...newRole });
    result(null, { id: res.insertId, ...newRole });
  });
};

Role.findById = (id, result) => {
  sql.query(`SELECT * FROM roles WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Role: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Invoice with the id
    result({ kind: "not_found" }, null);
  });
};

Role.getAll = (title, result) => {
  let query = "SELECT * FROM roles";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Roles: ", res);
    result(null, res);
  });
};

Role.getAllPublished = result => {
  sql.query("SELECT * FROM roles", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Roles: ", res);
    result(null, res);
  });
};

Role.updateById = (id, Role, result) => {
  sql.query(
    "UPDATE Roles SET title = ?, description = ?, published = ? WHERE id = ?",
    [Role.id, id],
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

      console.log("updated Role: ", { id: id, ...role });
      result(null, { id: id, ...role });
    }
  );
};

Role.remove = (id, result) => {
  sql.query("DELETE FROM Roles WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Role with id: ", id);
    result(null, res);
  });
};

Role.removeAll = result => {
  sql.query("DELETE FROM Roles", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Roles`);
    result(null, res);
  });
};

module.exports = Role;
