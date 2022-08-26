const sql = require("./db.js");
const Services_rates_type = function(services_rates_type) {
  this.name = services_rates_type.name;
};

Services_rates_type.create = (newServices_rates_type, result) => {
  sql.query("INSERT INTO Services_rates_types SET ?", newServices_rates_type, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Services_rates_type: ", { id: res.insertId, ...newServices_rates_type });
    result(null, { id: res.insertId, ...newServices_rates_type });
  });
};

Services_rates_type.findById = (id, result) => {
  sql.query(`SELECT * FROM services_rates_types WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Services_rates_type: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Services_rates_type.getAll = (title, result) => {
  let query = "SELECT * FROM services_rates_types";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Services_rates_types: ", res);
    result(null, res);
  });
};

Services_rates_type.getAllPublished = result => {
  sql.query("SELECT * FROM services_rates_types", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Services_rates_types: ", res);
    result(null, res);
  });
};

Services_rates_type.updateById = (id, Services_rates_type, result) => {
  sql.query(
    "UPDATE Services_rates_types SET title = ?, description = ?, published = ? WHERE id = ?",
    [Services_rates_type.id, id],
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

      console.log("updated Services_rates_type: ", { id: id, ...services_rates_type });
      result(null, { id: id, ...services_rates_type });
    }
  );
};

Services_rates_type.remove = (id, result) => {
  sql.query("DELETE FROM Services_rates_types WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Services_rates_type with id: ", id);
    result(null, res);
  });
};

Services_rates_type.removeAll = result => {
  sql.query("DELETE FROM Services_rates_types", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Services_rates_types`);
    result(null, res);
  });
};

module.exports = Services_rates_type;
