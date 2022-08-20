const sql = require("./db.js");
const Job_orders_statu = function(job_orders_statu) {
  this.title = job_orders_statu.id;
};

Job_orders_statu.create = (newJob_orders_statu, result) => {
  sql.query("INSERT INTO Job_orders_status SET ?", newJob_orders_statu, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Job_orders_statu: ", { id: res.insertId, ...newJob_orders_statu });
    result(null, { id: res.insertId, ...newJob_orders_statu });
  });
};

Job_orders_statu.findById = (id, result) => {
  sql.query(`SELECT * FROM job_orders_status WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Job_orders_statu: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Invoice with the id
    result({ kind: "not_found" }, null);
  });
};

Job_orders_statu.getAll = (title, result) => {
  let query = "SELECT * FROM job_orders_status";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Job_orders_status: ", res);
    result(null, res);
  });
};

Job_orders_statu.getAllPublished = result => {
  sql.query("SELECT * FROM job_orders_status", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Job_orders_status: ", res);
    result(null, res);
  });
};

Job_orders_statu.updateById = (id, Job_orders_statu, result) => {
  sql.query(
    "UPDATE Job_orders_status SET title = ?, description = ?, published = ? WHERE id = ?",
    [Job_orders_statu.id, id],
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

      console.log("updated Job_orders_statu: ", { id: id, ...job_orders_statu });
      result(null, { id: id, ...job_orders_statu });
    }
  );
};

Job_orders_statu.remove = (id, result) => {
  sql.query("DELETE FROM Job_orders_status WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Job_orders_statu with id: ", id);
    result(null, res);
  });
};

Job_orders_statu.removeAll = result => {
  sql.query("DELETE FROM Job_orders_status", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Job_orders_status`);
    result(null, res);
  });
};

module.exports = Job_orders_statu;
