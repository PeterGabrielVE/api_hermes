const sql = require("./db.js");

// constructor
const Invoice = function(invoice) {
  this.title = invoice.id;
};

Invoice.create = (newInvoice, result) => {
  sql.query("INSERT INTO Invoices SET ?", newInvoice, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Invoice: ", { id: res.insertId, ...newInvoice });
    result(null, { id: res.insertId, ...newInvoice });
  });
};

Invoice.findById = (id, result) => {
  sql.query(`SELECT * FROM Invoices WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Invoice: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Invoice with the id
    result({ kind: "not_found" }, null);
  });
};

Invoice.getAll = (title, result) => {
  let query = "SELECT * FROM Invoices";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Invoices: ", res);
    result(null, res);
  });
};

Invoice.getAllPublished = result => {
  sql.query("SELECT * FROM Invoices", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Invoices: ", res);
    result(null, res);
  });
};

Invoice.updateById = (id, Invoice, result) => {
  sql.query(
    "UPDATE Invoices SET title = ?, description = ?, published = ? WHERE id = ?",
    [Invoice.id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Invoice with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Invoice: ", { id: id, ...invoice });
      result(null, { id: id, ...invoice });
    }
  );
};

Invoice.remove = (id, result) => {
  sql.query("DELETE FROM Invoices WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Invoice with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Invoice with id: ", id);
    result(null, res);
  });
};

Invoice.removeAll = result => {
  sql.query("DELETE FROM Invoices", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Invoices`);
    result(null, res);
  });
};

module.exports = Invoice;
