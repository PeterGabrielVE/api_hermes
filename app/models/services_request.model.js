const sql = require("./db.js");
const Services_request = function(services_request) {
  this.title = services_request.id;
};

Services_request.create = (newServices_request, result) => {
  sql.query("INSERT INTO Services_requests SET ?", newServices_request, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Services_request: ", { id: res.insertId, ...newServices_request });
    result(null, { id: res.insertId, ...newServices_request });
  });
};

Services_request.findById = (id, result) => {
  sql.query(`SELECT * FROM services_requests WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Services_request: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Invoice with the id
    result({ kind: "not_found" }, null);
  });
};

Services_request.getAll = (title, result) => {
  let query = "SELECT * FROM services_requests";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Services_requests: ", res);
    result(null, res);
  });
};

Services_request.getAllPublished = result => {
  sql.query("SELECT * FROM services_requests", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Services_requests: ", res);
    result(null, res);
  });
};

Services_request.updateById = (id, Services_request, result) => {
  sql.query(
    "UPDATE Services_requests SET title = ?, description = ?, published = ? WHERE id = ?",
    [Services_request.id, id],
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

      console.log("updated Services_request: ", { id: id, ...services_request });
      result(null, { id: id, ...services_request });
    }
  );
};

Services_request.remove = (id, result) => {
  sql.query("DELETE FROM Services_requests WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Services_request with id: ", id);
    result(null, res);
  });
};

Services_request.removeAll = result => {
  sql.query("DELETE FROM Services_requests", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Services_requests`);
    result(null, res);
  });
};

module.exports = Services_request;
