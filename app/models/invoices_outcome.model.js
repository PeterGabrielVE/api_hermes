const sql = require("./db.js");
const Invoices_outcome = function(invoices_outcome) {
  this.name = invoices_outcome.name;
};

Invoices_outcome.create = (newInvoices_outcome, result) => {
  sql.query("INSERT INTO Invoices_outcomes SET ?", newInvoices_outcome, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Invoices_outcome: ", { id: res.insertId, ...newInvoices_outcome });
    result(null, { id: res.insertId, ...newInvoices_outcome });
  });
};

Invoices_outcome.findById = (id, result) => {
  sql.query(`SELECT * FROM invoices_outcomes WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Invoices_outcome: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Invoice with the id
    result({ kind: "not_found" }, null);
  });
};

Invoices_outcome.getAll = (title, result) => {
  let query = "SELECT * FROM invoices_outcomes";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Invoices_outcomes: ", res);
    result(null, res);
  });
};

Invoices_outcome.getAllPublished = result => {
  sql.query("SELECT * FROM invoices_outcomes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Invoices_outcomes: ", res);
    result(null, res);
  });
};

Invoices_outcome.updateById = (id, Invoices_outcome, result) => {
  sql.query(
    "UPDATE Invoices_outcomes SET title = ?, description = ?, published = ? WHERE id = ?",
    [Invoices_outcome.id, id],
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

      console.log("updated Invoices_outcome: ", { id: id, ...invoices_outcome });
      result(null, { id: id, ...invoices_outcome });
    }
  );
};

Invoices_outcome.remove = (id, result) => {
  sql.query("DELETE FROM Invoices_outcomes WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Invoices_outcome with id: ", id);
    result(null, res);
  });
};

Invoices_outcome.removeAll = result => {
  sql.query("DELETE FROM Invoices_outcomes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Invoices_outcomes`);
    result(null, res);
  });
};

module.exports = Invoices_outcome;