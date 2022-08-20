const sql = require("./db.js");
const Services_requests_statu = function(services_requests_statu) {
  this.title = services_requests_statu.id;
};

Services_requests_statu.create = (newServices_requests_statu, result) => {
  sql.query("INSERT INTO Services_requests_status SET ?", newServices_requests_statu, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Services_requests_statu: ", { id: res.insertId, ...newServices_requests_statu });
    result(null, { id: res.insertId, ...newServices_requests_statu });
  });
};

Services_requests_statu.findById = (id, result) => {
  sql.query(`SELECT * FROM services_requests_status WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Services_requests_statu: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Invoice with the id
    result({ kind: "not_found" }, null);
  });
};

Services_requests_statu.getAll = (title, result) => {
  let query = "SELECT * FROM services_requests_status";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Services_requests_status: ", res);
    result(null, res);
  });
};

Services_requests_statu.getAllPublished = result => {
  sql.query("SELECT * FROM services_requests_status", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Services_requests_status: ", res);
    result(null, res);
  });
};

Services_requests_statu.updateById = (id, Services_requests_statu, result) => {
  sql.query(
    "UPDATE Services_requests_status SET title = ?, description = ?, published = ? WHERE id = ?",
    [Services_requests_statu.id, id],
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

      console.log("updated Services_requests_statu: ", { id: id, ...services_requests_statu });
      result(null, { id: id, ...services_requests_statu });
    }
  );
};

Services_requests_statu.remove = (id, result) => {
  sql.query("DELETE FROM Services_requests_status WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Services_requests_statu with id: ", id);
    result(null, res);
  });
};

Services_requests_statu.removeAll = result => {
  sql.query("DELETE FROM Services_requests_status", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Services_requests_status`);
    result(null, res);
  });
};

module.exports = Services_requests_statu;
