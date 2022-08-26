const sql = require("./db.js");
const Receive_payment_invoic = function(receive_payment_invoic) {

  this.invoice_id = receive_payment_invoic.invoice_id;
  this.receive_id	 = receive_payment_invoic.receive_id	;
};

Receive_payment_invoic.create = (newReceive_payment_invoic, result) => {
  sql.query("INSERT INTO Receive_payment_invoice SET ?", newReceive_payment_invoic, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Receive_payment_invoic: ", { id: res.insertId, ...newReceive_payment_invoic });
    result(null, { id: res.insertId, ...newReceive_payment_invoic });
  });
};

Receive_payment_invoic.findById = (id, result) => {
  sql.query(`SELECT * FROM receive_payment_invoice WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Receive_payment_invoic: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Invoice with the id
    result({ kind: "not_found" }, null);
  });
};

Receive_payment_invoic.getAll = (title, result) => {
  let query = "SELECT * FROM receive_payment_invoice";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Receive_payment_invoice: ", res);
    result(null, res);
  });
};

Receive_payment_invoic.getAllPublished = result => {
  sql.query("SELECT * FROM receive_payment_invoice", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Receive_payment_invoice: ", res);
    result(null, res);
  });
};

Receive_payment_invoic.updateById = (id, Receive_payment_invoic, result) => {
  sql.query(
    "UPDATE Receive_payment_invoice SET title = ?, description = ?, published = ? WHERE id = ?",
    [Receive_payment_invoic.id, id],
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

      console.log("updated Receive_payment_invoic: ", { id: id, ...receive_payment_invoic });
      result(null, { id: id, ...receive_payment_invoic });
    }
  );
};

Receive_payment_invoic.remove = (id, result) => {
  sql.query("DELETE FROM Receive_payment_invoice WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Receive_payment_invoic with id: ", id);
    result(null, res);
  });
};

Receive_payment_invoic.removeAll = result => {
  sql.query("DELETE FROM Receive_payment_invoice", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Receive_payment_invoice`);
    result(null, res);
  });
};

module.exports = Receive_payment_invoic;
