const sql = require("./db.js");
const Service = function(service) {
  this.title = service.id;
};

Service.create = (newService, result) => {
  sql.query("INSERT INTO Services SET ?", newService, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Service: ", { id: res.insertId, ...newService });
    result(null, { id: res.insertId, ...newService });
  });
};

Service.findById = (id, result) => {
  sql.query(`SELECT * FROM services WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Service: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Invoice with the id
    result({ kind: "not_found" }, null);
  });
};

Service.getAll = (title, result) => {
  let query = "SELECT * FROM services";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Services: ", res);
    result(null, res);
  });
};

Service.getAllPublished = result => {
  sql.query("SELECT * FROM services", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Services: ", res);
    result(null, res);
  });
};

Service.updateById = (id, Service, result) => {
  sql.query(
    "UPDATE Services SET title = ?, description = ?, published = ? WHERE id = ?",
    [Service.id, id],
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

      console.log("updated Service: ", { id: id, ...service });
      result(null, { id: id, ...service });
    }
  );
};

Service.remove = (id, result) => {
  sql.query("DELETE FROM Services WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Service with id: ", id);
    result(null, res);
  });
};

Service.removeAll = result => {
  sql.query("DELETE FROM Services", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Services`);
    result(null, res);
  });
};

module.exports = Service;
