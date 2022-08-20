const sql = require("./db.js");
const Job_order = function(job_order) {
  this.title = job_order.id;
};

Job_order.create = (newJob_order, result) => {
  sql.query("INSERT INTO Job_orders SET ?", newJob_order, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Job_order: ", { id: res.insertId, ...newJob_order });
    result(null, { id: res.insertId, ...newJob_order });
  });
};

Job_order.findById = (id, result) => {
  sql.query(`SELECT * FROM job_orders WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Job_order: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Job_order.getAll = (title, result) => {
  let query = "SELECT * FROM job_orders";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Job_orders: ", res);
    result(null, res);
  });
};

Job_order.getAllPublished = result => {
  sql.query("SELECT * FROM job_orders", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Job_orders: ", res);
    result(null, res);
  });
};

Job_order.updateById = (id, Job_order, result) => {
  sql.query(
    "UPDATE Job_orders SET title = ?, description = ?, published = ? WHERE id = ?",
    [Job_order.id, id],
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

      console.log("updated Job_order: ", { id: id, ...job_order });
      result(null, { id: id, ...job_order });
    }
  );
};

Job_order.remove = (id, result) => {
  sql.query("DELETE FROM Job_orders WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Job_order with id: ", id);
    result(null, res);
  });
};

Job_order.removeAll = result => {
  sql.query("DELETE FROM Job_orders", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Job_orders`);
    result(null, res);
  });
};

module.exports = Job_order;
