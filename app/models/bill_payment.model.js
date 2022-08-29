const sql = require("./db.js");

// constructor
const Bill_payment = function(Bill_payment) {
  
    this.status = Bill_payment.status;
    this.date_receive = Bill_payment.date_receive;
    this.bills_list = Bill_payment.bills_list;
    this.assignments_list = Bill_payment.assignments_list;
    this.interpreter_id = Bill_payment.interpreter_id ;
    this.payment_method = Bill_payment.payment_method;
    this.date_Payment = Bill_payment.date_Payment;
    this.transaction_number = Bill_payment.transaction_number;
    this.check_number = Bill_payment.check_number;
    this.attachment = Bill_payment.attachment;
    this.payment_total = Bill_payment.payment_total;
    this.account = Bill_payment.account;
    this.check_payment_date = Bill_payment.check_payment_date;
    this.attachment_Check_Trans = Bill_payment.attachment_Check_Trans;
};

Bill_payment.create = (newBill_payment, result) => {
  sql.query("INSERT INTO Bill_payments SET ?", newBill_payment, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Bill_payment: ", { id: res.insertId, ...newBill_payment });
    result(null, { id: res.insertId, ...newBill_payment });
  });
};

Bill_payment.findById = (id, result) => {
  sql.query(`SELECT * FROM Bill_payments WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Bill_payment: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Agencie with the id
    result({ kind: "not_found" }, null);
  });
};

Bill_payment.getAll = (title, result) => {
  let query = "SELECT * FROM Bill_payments";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Bill_payments: ", res);
    result(null, res);
  });
};

Bill_payment.getAllPublished = result => {
  sql.query("SELECT * FROM Bill_payments", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Bill_payments: ", res);
    result(null, res);
  });
};

Bill_payment.updateById = (id, Bill_payment, result) => {
  sql.query(
    "UPDATE Bill_payments SET title = ?, description = ?, published = ? WHERE id = ?",
    [Bill_payment.id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Agencie with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Bill_payment: ", { id: id, ...Bill_payment });
      result(null, { id: id, ...Bill_payment });
    }
  );
};

Bill_payment.remove = (id, result) => {
  sql.query("DELETE FROM Bill_payments WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Agencie with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Bill_payment with id: ", id);
    result(null, res);
  });
};

Bill_payment.removeAll = result => {
  sql.query("DELETE FROM Bill_payments", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Bill_payments`);
    result(null, res);
  });
};

module.exports = Bill_payment;