const sql = require("./db.js");
const Service_estimate_jo = function(service_estimate_jo) {
  this.title = service_estimate_jo.id;
};

Service_estimate_jo.create = (newService_estimate_jo, result) => {
  sql.query("INSERT INTO Service_estimate_job SET ?", newService_estimate_jo, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Service_estimate_jo: ", { id: res.insertId, ...newService_estimate_jo });
    result(null, { id: res.insertId, ...newService_estimate_jo });
  });
};

Service_estimate_jo.findById = (id, result) => {
  sql.query(`SELECT * FROM service_estimate_job WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Service_estimate_jo: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Service_estimate_jo.getAll = (title, result) => {
  let query = "SELECT * FROM service_estimate_job";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Service_estimate_job: ", res);
    result(null, res);
  });
};

Service_estimate_jo.getAllPublished = result => {
  sql.query("SELECT * FROM service_estimate_jo", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Service_estimate_job: ", res);
    result(null, res);
  });
};

Service_estimate_jo.updateById = (id, Service_estimate_jo, result) => {
  sql.query(
    "UPDATE Service_estimate_job SET title = ?, description = ?, published = ? WHERE id = ?",
    [Service_estimate_jo.id, id],
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

      console.log("updated Service_estimate_jo: ", { id: id, ...service_estimate_jo });
      result(null, { id: id, ...service_estimate_jo });
    }
  );
};

Service_estimate_jo.remove = (id, result) => {
  sql.query("DELETE FROM Service_estimate_job WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Service_estimate_jo with id: ", id);
    result(null, res);
  });
};

Service_estimate_jo.removeAll = result => {
  sql.query("DELETE FROM Service_estimate_job", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Service_estimate_job`);
    result(null, res);
  });
};

module.exports = Service_estimate_jo;
