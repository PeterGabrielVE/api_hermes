const sql = require("./db.js");
const Model_has_permission = function(model_has_permission) {
  this.permission_id  = model_has_permission.permission_id ;
  this.model_type = model_has_permission.model_type;
  this.model_id  = model_has_permission.model_id ;
};

Model_has_permission.create = (newModel_has_permission, result) => {
  sql.query("INSERT INTO Model_has_permissions SET ?", newModel_has_permission, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Model_has_permission: ", { id: res.insertId, ...newModel_has_permission });
    result(null, { id: res.insertId, ...newModel_has_permission });
  });
};

Model_has_permission.findById = (id, result) => {
  sql.query(`SELECT * FROM model_has_permissions WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Model_has_permission: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Model_has_permission.getAll = (title, result) => {
  let query = "SELECT * FROM model_has_permissions";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Model_has_permissions: ", res);
    result(null, res);
  });
};

Model_has_permission.getAllPublished = result => {
  sql.query("SELECT * FROM model_has_permissions", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Model_has_permissions: ", res);
    result(null, res);
  });
};

Model_has_permission.updateById = (id, Model_has_permission, result) => {
  sql.query(
    "UPDATE Model_has_permissions SET title = ?, description = ?, published = ? WHERE id = ?",
    [Model_has_permission.id, id],
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

      console.log("updated Model_has_permission: ", { id: id, ...model_has_permission });
      result(null, { id: id, ...model_has_permission });
    }
  );
};

Model_has_permission.remove = (id, result) => {
  sql.query("DELETE FROM Model_has_permissions WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Model_has_permission with id: ", id);
    result(null, res);
  });
};

Model_has_permission.removeAll = result => {
  sql.query("DELETE FROM Model_has_permissions", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Model_has_permissions`);
    result(null, res);
  });
};

module.exports = Model_has_permission;
