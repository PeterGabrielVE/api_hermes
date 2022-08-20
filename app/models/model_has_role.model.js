const sql = require("./db.js");
const Model_has_role = function(model_has_role) {
  this.title = model_has_role.id;
};

Model_has_role.create = (newModel_has_role, result) => {
  sql.query("INSERT INTO Model_has_roles SET ?", newModel_has_role, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Model_has_role: ", { id: res.insertId, ...newModel_has_role });
    result(null, { id: res.insertId, ...newModel_has_role });
  });
};

Model_has_role.findById = (id, result) => {
  sql.query(`SELECT * FROM model_has_roles WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Model_has_role: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Invoice with the id
    result({ kind: "not_found" }, null);
  });
};

Model_has_role.getAll = (title, result) => {
  let query = "SELECT * FROM model_has_roles";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Model_has_roles: ", res);
    result(null, res);
  });
};

Model_has_role.getAllPublished = result => {
  sql.query("SELECT * FROM model_has_roles", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Model_has_roles: ", res);
    result(null, res);
  });
};

Model_has_role.updateById = (id, Model_has_role, result) => {
  sql.query(
    "UPDATE Model_has_roles SET title = ?, description = ?, published = ? WHERE id = ?",
    [Model_has_role.id, id],
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

      console.log("updated Model_has_role: ", { id: id, ...model_has_role });
      result(null, { id: id, ...model_has_role });
    }
  );
};

Model_has_role.remove = (id, result) => {
  sql.query("DELETE FROM Model_has_roles WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Model_has_role with id: ", id);
    result(null, res);
  });
};

Model_has_role.removeAll = result => {
  sql.query("DELETE FROM Model_has_roles", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Model_has_roles`);
    result(null, res);
  });
};

module.exports = Model_has_role;
