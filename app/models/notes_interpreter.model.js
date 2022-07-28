const sql = require("./db.js");
const Notes_interpreter = function(notes_interpreter) {
  this.title = notes_interpreter.id;
};

Notes_interpreter.create = (newNotes_interpreter, result) => {
  sql.query("INSERT INTO Notes_interpreters SET ?", newNotes_interpreter, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Notes_interpreter: ", { id: res.insertId, ...newNotes_interpreter });
    result(null, { id: res.insertId, ...newNotes_interpreter });
  });
};

Notes_interpreter.findById = (id, result) => {
  sql.query(`SELECT * FROM notes_interpreters WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Notes_interpreter: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Notes_interpreter.getAll = (title, result) => {
  let query = "SELECT * FROM notes_interpreters";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Notes_interpreters: ", res);
    result(null, res);
  });
};

Notes_interpreter.getAllPublished = result => {
  sql.query("SELECT * FROM notes_interpreters", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Notes_interpreters: ", res);
    result(null, res);
  });
};

Notes_interpreter.updateById = (id, Notes_interpreter, result) => {
  sql.query(
    "UPDATE Notes_interpreters SET title = ?, description = ?, published = ? WHERE id = ?",
    [Notes_interpreter.id, id],
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

      console.log("updated Notes_interpreter: ", { id: id, ...notes_interpreter });
      result(null, { id: id, ...notes_interpreter });
    }
  );
};

Notes_interpreter.remove = (id, result) => {
  sql.query("DELETE FROM Notes_interpreters WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Notes_interpreter with id: ", id);
    result(null, res);
  });
};

Notes_interpreter.removeAll = result => {
  sql.query("DELETE FROM Notes_interpreters", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Notes_interpreters`);
    result(null, res);
  });
};

module.exports = Notes_interpreter;
