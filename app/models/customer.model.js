const sql = require("./db.js");
const Customer = function(customer) {
 
  this.Cus_First_Name = customer.Cus_First_Name ;
  this.Cus_Middle_Name = customer.Cus_Middle_Name ;
  this.Cus_Last_Name = customer.Cus_Last_Name ;
  this.Cus_Company_Name = customer.Cus_Company_Name ;
  this.Cus_Billing_Street_Address_1= customer.Cus_Billing_Street_Address_1;
  this.Cus_Billing_Street_Address_2= customer.Cus_Billing_Street_Address_2;
  this.Cus_Billing_City= customer.Cus_Billing_City;
  this.Cus_Billing_State= customer.Cus_Billing_State;
  this.Cus_Billing_Zip= customer.Cus_Billing_Zip;
  this.Cus_Notes= customer.Cus_Notes;
  this.Cus_Billing_Notes = customer.Cus_Billing_Notes ;
  this.Cus_Service = customer.Cus_Service ;
  this.Cus_Attachments= customer.Cus_Attachments;
  this.Cus_Billing_Term = customer.Cus_Billing_Term ;
  this.Cus_Phone_Number= customer.Cus_Phone_Number;
  this.Cus_Fax_Number= customer.Cus_Fax_Number;
  this.Cus_Phone_Other = customer.Cus_Phone_Other ;
  this.Cus_WebSite = customer.Cus_WebSite ;
  this.Cus_Email_Address = customer.Cus_Email_Address ;
  this.Cus_LL_Wiki = customer.Cus_LL_Wiki ;
  this.Cus_Status= customer.Cus_Status;
  this.Cus_Fullname= customer.Cus_Fullname;
  this.attachments= customer.attachments; 
  this.ext_customer= customer.ext_customer; 
};

Customer.create = (newCustomer, result) => {
  sql.query("INSERT INTO Customers SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Customer: ", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
  });
};

Customer.findById = (id, result) => {
  sql.query(`SELECT * FROM customers WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Customer.getAll = (title, result) => {
  let query = "SELECT * FROM customers";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Customers: ", res);
    result(null, res);
  });
};

Customer.getAllPublished = result => {
  sql.query("SELECT * FROM customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Customers: ", res);
    result(null, res);
  });
};

Customer.updateById = (id, Customer, result) => {
  sql.query(
    "UPDATE Customers SET title = ?, description = ?, published = ? WHERE id = ?",
    [Customer.id, id],
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

      console.log("updated Customer: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};

Customer.remove = (id, result) => {
  sql.query("DELETE FROM Customers WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Customer with id: ", id);
    result(null, res);
  });
};

Customer.removeAll = result => {
  sql.query("DELETE FROM Customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Customers`);
    result(null, res);
  });
};

module.exports = Customer;
