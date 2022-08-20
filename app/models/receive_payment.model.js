const sql = require("./db.js");
const Receive_payment = function(receive_payment) {
  this.title = receive_payment.id;
};

Receive_payment.create = (newReceive_payment, result) => {
  sql.query("INSERT INTO Receive_payments SET ?", newReceive_payment, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Receive_payment: ", { id: res.insertId, ...newReceive_payment });
    result(null, { id: res.insertId, ...newReceive_payment });
  });
};

Receive_payment.findById = (id, result) => {
  sql.query(`SELECT * FROM receive_payments WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Receive_payment: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Invoice with the id
    result({ kind: "not_found" }, null);
  });
};

Receive_payment.getAll = (title, result) => {
  let query = "SELECT * FROM receive_payments";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Receive_payments: ", res);
    result(null, res);
  });
};

Receive_payment.getAllPublished = result => {
  sql.query("SELECT * FROM receive_payments", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Receive_payments: ", res);
    result(null, res);
  });
};

Receive_payment.updateById = (id, Receive_payment, result) => {
  sql.query(
    "UPDATE Receive_payments SET title = ?, description = ?, published = ? WHERE id = ?",
    [Receive_payment.id, id],
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

      console.log("updated Receive_payment: ", { id: id, ...receive_payment });
      result(null, { id: id, ...receive_payment });
    }
  );
};

Receive_payment.remove = (id, result) => {
  sql.query("DELETE FROM Receive_payments WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Receive_payment with id: ", id);
    result(null, res);
  });
};

Receive_payment.removeAll = result => {
  sql.query("DELETE FROM Receive_payments", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Receive_payments`);
    result(null, res);
  });
};

module.exports = Receive_payment;
