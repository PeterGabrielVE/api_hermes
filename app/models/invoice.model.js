const sql = require("./db.js");

// constructor
const Invoice = function(invoice) {

  this.Invoice_Status = invoice.Invoice_Status;
  this.Invoice_Jobs_Number = invoice.Invoice_Jobs_Number;
  this.Invoice_Job_Cus_Number = invoice.Invoice_Job_Cus_Number;
  this.Invoice_Cus_Company_Name = invoice.Invoice_Cus_Company_Name;
  this.Invoice_Cus_Billing_Company_Street_1 = invoice.Invoice_Cus_Billing_Company_Street_1;
  this.Invoice_Cus_Billing_Company_Street_2 = invoice.Invoice_Cus_Billing_Company_Street_2;

  this.Invoice_Cus_Billing_City = invoice.Invoice_Cus_Billing_City;
  this.Invoice_Cus_Billing_State = invoice.Invoice_Cus_Billing_State;
  this.Invoice_Cus_Billing_Zip = invoice.Invoice_Cus_Billing_Zip;
  this.Invoice_Cus_Billing_Term = invoice.Invoice_Cus_Billing_Term;
  this.Invoice_Cus_Billing_E_mail = invoice.Invoice_Cus_Billing_E_mail;

  this.Invoice_Subtotal = invoice.Invoice_Subtotal;
  this.Invoice_Credits = invoice.Invoice_Credits;
  this.Invoice_Total = invoice.Invoice_Total;
  this.Invoice_Orig_Amount = invoice.Invoice_Orig_Amount;
  this.Invoice_Amount_Due = invoice.Invoice_Amount_Due;

  this.Invoice_Payment = invoice.Invoice_Payment;
  this.Invoice_Attachments = invoice.Invoice_Attachments;
  this.Invoice_Date = invoice.Invoice_Date;
  this.Invoice_Due_Date = invoice.Invoice_Due_Date;
  this.Invoice_Notes= invoice.Invoice_Notes;
  
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
  sql.query(`SELECT * FROM invoices WHERE id = ${id}`, (err, res) => {
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
  let query = "SELECT * FROM invoices";

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
  sql.query("SELECT * FROM invoices", (err, res) => {
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
