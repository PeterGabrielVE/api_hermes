const sql = require("./db.js");
const Job = function(job) {
  this.title = job.id;
};

Job.create = (newJob, result) => {
  sql.query("INSERT INTO Jobs SET ?", newJob, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Job: ", { id: res.insertId, ...newJob });
    result(null, { id: res.insertId, ...newJob });
  });
};

Job.findById = (id, result) => {
  sql.query(`SELECT * FROM jobs WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Job: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Invoice with the id
    result({ kind: "not_found" }, null);
  });
};

Job.getAll = (title, result) => {
  let query = "SELECT * FROM jobs";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Jobs: ", res);
    result(null, res);
  });
};

Job.getAllPublished = result => {
  sql.query("SELECT * FROM jobs", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Jobs: ", res);
    result(null, res);
  });
};

Job.updateById = (id, Job, result) => {
  sql.query(
    "UPDATE Jobs SET title = ?, description = ?, published = ? WHERE id = ?",
    [Job.id, id],
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

      console.log("updated Job: ", { id: id, ...job });
      result(null, { id: id, ...job });
    }
  );
};

Job.remove = (id, result) => {
  sql.query("DELETE FROM Jobs WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Job with id: ", id);
    result(null, res);
  });
};

Job.removeAll = result => {
  sql.query("DELETE FROM Jobs", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Jobs`);
    result(null, res);
  });
};

module.exports = Job;
