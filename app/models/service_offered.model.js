const sql = require("./db.js");
const Service_offered = function(service_offered) {
  this.title = service_offered.id;
};

Service_offered.create = (newService_offered, result) => {
  sql.query("INSERT INTO Service_offereds SET ?", newService_offered, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Service_offered: ", { id: res.insertId, ...newService_offered });
    result(null, { id: res.insertId, ...newService_offered });
  });
};

Service_offered.findById = (id, result) => {
  sql.query(`SELECT * FROM service_offereds WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Service_offered: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Service_offered.getAll = (title, result) => {
  let query = "SELECT * FROM service_offereds";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Service_offereds: ", res);
    result(null, res);
  });
};

Service_offered.getAllPublished = result => {
  sql.query("SELECT * FROM service_offereds", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Service_offereds: ", res);
    result(null, res);
  });
};

Service_offered.updateById = (id, Service_offered, result) => {
  sql.query(
    "UPDATE Service_offereds SET title = ?, description = ?, published = ? WHERE id = ?",
    [Service_offered.id, id],
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

      console.log("updated Service_offered: ", { id: id, ...service_offered });
      result(null, { id: id, ...service_offered });
    }
  );
};

Service_offered.remove = (id, result) => {
  sql.query("DELETE FROM Service_offereds WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Service_offered with id: ", id);
    result(null, res);
  });
};

Service_offered.removeAll = result => {
  sql.query("DELETE FROM Service_offereds", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Service_offereds`);
    result(null, res);
  });
};

module.exports = Service_offered;
