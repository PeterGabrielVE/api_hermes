const sql = require("./db.js");
const Service_request_fiel = function(service_request_fiel) {
  this.name = service_request_fiel.name;
  this.status = service_request_fiel.status;
};

Service_request_fiel.create = (newService_request_fiel, result) => {
  sql.query("INSERT INTO Service_request_field SET ?", newService_request_fiel, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Service_request_fiel: ", { id: res.insertId, ...newService_request_fiel });
    result(null, { id: res.insertId, ...newService_request_fiel });
  });
};

Service_request_fiel.findById = (id, result) => {
  sql.query(`SELECT * FROM service_request_field WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Service_request_fiel: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Service_request_fiel.getAll = (title, result) => {
  let query = "SELECT * FROM service_request_field";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Service_request_field: ", res);
    result(null, res);
  });
};

Service_request_fiel.getAllPublished = result => {
  sql.query("SELECT * FROM service_request_field", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Service_request_field: ", res);
    result(null, res);
  });
};

Service_request_fiel.updateById = (id, Service_request_fiel, result) => {
  sql.query(
    "UPDATE Service_request_field SET title = ?, description = ?, published = ? WHERE id = ?",
    [Service_request_fiel.id, id],
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

      console.log("updated Service_request_fiel: ", { id: id, ...service_request_fiel });
      result(null, { id: id, ...service_request_fiel });
    }
  );
};

Service_request_fiel.remove = (id, result) => {
  sql.query("DELETE FROM Service_request_field WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Service_request_fiel with id: ", id);
    result(null, res);
  });
};

Service_request_fiel.removeAll = result => {
  sql.query("DELETE FROM Service_request_field", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Service_request_field`);
    result(null, res);
  });
};

module.exports = Service_request_fiel;
