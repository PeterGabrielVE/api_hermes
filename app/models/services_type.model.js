const sql = require("./db.js");
const Services_type = function(services_type) {
  this.title = services_type.id;
};

Services_type.create = (newServices_type, result) => {
  sql.query("INSERT INTO Services_types SET ?", newServices_type, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Services_type: ", { id: res.insertId, ...newServices_type });
    result(null, { id: res.insertId, ...newServices_type });
  });
};

Services_type.findById = (id, result) => {
  sql.query(`SELECT * FROM services_types WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Services_type: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Invoice with the id
    result({ kind: "not_found" }, null);
  });
};

Services_type.getAll = (title, result) => {
  let query = "SELECT * FROM services_types";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Services_types: ", res);
    result(null, res);
  });
};

Services_type.getAllPublished = result => {
  sql.query("SELECT * FROM services_types", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Services_types: ", res);
    result(null, res);
  });
};

Services_type.updateById = (id, Services_type, result) => {
  sql.query(
    "UPDATE Services_types SET title = ?, description = ?, published = ? WHERE id = ?",
    [Services_type.id, id],
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

      console.log("updated Services_type: ", { id: id, ...services_type });
      result(null, { id: id, ...services_type });
    }
  );
};

Services_type.remove = (id, result) => {
  sql.query("DELETE FROM Services_types WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Services_type with id: ", id);
    result(null, res);
  });
};

Services_type.removeAll = result => {
  sql.query("DELETE FROM Services_types", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Services_types`);
    result(null, res);
  });
};

module.exports = Services_type;
