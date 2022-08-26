const sql = require("./db.js");
const State = function(state) {
  this.name = state.name;
  this.abbreviation = state.abbreviation;
};

State.create = (newState, result) => {
  sql.query("INSERT INTO States SET ?", newState, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created State: ", { id: res.insertId, ...newState });
    result(null, { id: res.insertId, ...newState });
  });
};

State.findById = (id, result) => {
  sql.query(`SELECT * FROM states WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found State: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

State.getAll = (title, result) => {
  let query = "SELECT * FROM states";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("States: ", res);
    result(null, res);
  });
};

State.getAllPublished = result => {
  sql.query("SELECT * FROM states", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("States: ", res);
    result(null, res);
  });
};

State.updateById = (id, State, result) => {
  sql.query(
    "UPDATE States SET title = ?, description = ?, published = ? WHERE id = ?",
    [State.id, id],
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

      console.log("updated State: ", { id: id, ...state });
      result(null, { id: id, ...state });
    }
  );
};

State.remove = (id, result) => {
  sql.query("DELETE FROM States WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted State with id: ", id);
    result(null, res);
  });
};

State.removeAll = result => {
  sql.query("DELETE FROM States", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} States`);
    result(null, res);
  });
};

module.exports = State;
