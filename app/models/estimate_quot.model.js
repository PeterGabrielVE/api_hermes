const sql = require("./db.js");
const Estimate_quot = function(estimate_quot) {
  this.title = estimate_quot.id;
};

Estimate_quot.create = (newEstimate_quot, result) => {
  sql.query("INSERT INTO Estimate_quote SET ?", newEstimate_quot, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Estimate_quot: ", { id: res.insertId, ...newEstimate_quot });
    result(null, { id: res.insertId, ...newEstimate_quot });
  });
};

Estimate_quot.findById = (id, result) => {
  sql.query(`SELECT * FROM estimate_quote WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Estimate_quot: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Estimate_quot.getAll = (title, result) => {
  let query = "SELECT * FROM estimate_quote";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Estimate_quote: ", res);
    result(null, res);
  });
};

Estimate_quot.getAllPublished = result => {
  sql.query("SELECT * FROM estimate_quote", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Estimate_quote: ", res);
    result(null, res);
  });
};

Estimate_quot.updateById = (id, Estimate_quot, result) => {
  sql.query(
    "UPDATE Estimate_quote SET title = ?, description = ?, published = ? WHERE id = ?",
    [Invoice.id, id],
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

      console.log("updated Estimate_quot: ", { id: id, ...estimate_quot });
      result(null, { id: id, ...Estimate_quot });
    }
  );
};

Estimate_quot.remove = (id, result) => {
  sql.query("DELETE FROM Estimate_quote WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Estimate_quot with id: ", id);
    result(null, res);
  });
};

Estimate_quot.removeAll = result => {
  sql.query("DELETE FROM Estimate_quote", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Estimate_quote`);
    result(null, res);
  });
};

module.exports = Estimate_quot;
