const sql = require("./db.js");
const History_log = function(history_log) {
  this.name = history_log.name;
  this.info = history_log.info;
  this.created_at = history_log.created_at;
  this.created_by = history_log.created_by;
  this.files = history_log.files;
  this.markRead = history_log.markRead;
  this.id_object = history_log.id_object;
};

History_log.create = (newHistory_log, result) => {
  sql.query("INSERT INTO History_logs SET ?", newHistory_log, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created History_log: ", { id: res.insertId, ...newHistory_log });
    result(null, { id: res.insertId, ...newHistory_log });
  });
};

History_log.findById = (id, result) => {
  sql.query(`SELECT * FROM history_logs WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found History_log: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

History_log.getAll = (title, result) => {
  let query = "SELECT * FROM history_logs";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("History_logs: ", res);
    result(null, res);
  });
};

History_log.getAllPublished = result => {
  sql.query("SELECT * FROM history_logs", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("History_logs: ", res);
    result(null, res);
  });
};

History_log.updateById = (id,History_log, result) => {
  sql.query(
    "UPDATE History_logs SET title = ?, description = ?, published = ? WHERE id = ?",
    [History_log.id, id],
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

      console.log("updated History_log: ", { id: id, ...history_log });
      result(null, { id: id, ...history_log });
    }
  );
};

History_log.remove = (id, result) => {
  sql.query("DELETE FROM History_logs WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted History_log with id: ", id);
    result(null, res);
  });
};

History_log.removeAll = result => {
  sql.query("DELETE FROM History_logs", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} History_logs`);
    result(null, res);
  });
};

module.exports = History_log;
