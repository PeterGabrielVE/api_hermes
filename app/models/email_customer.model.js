const sql = require("./db.js");
const Email_customer = function(email_customer) {
  this.title = email_customer.id;
};

Email_customer.create = (newEmail_customer, result) => {
  sql.query("INSERT INTO Email_customers SET ?", newEmail_customer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Email_customer: ", { id: res.insertId, ...newEmail_customer });
    result(null, { id: res.insertId, ...newEmail_customer });
  });
};

Email_customer.findById = (id, result) => {
  sql.query(`SELECT * FROM email_customers WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Email_customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Invoice with the id
    result({ kind: "not_found" }, null);
  });
};

Email_customer.getAll = (title, result) => {
  let query = "SELECT * FROM Email_customers";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Email_customers: ", res);
    result(null, res);
  });
};

Email_customer.getAllPublished = result => {
  sql.query("SELECT * FROM Email_customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Email_customers: ", res);
    result(null, res);
  });
};

Email_customer.updateById = (id, Email_customer, result) => {
  sql.query(
    "UPDATE Email_customers SET title = ?, description = ?, published = ? WHERE id = ?",
    [Email_customer.id, id],
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

      console.log("updated Email_customer: ", { id: id, ...email_customer });
      result(null, { id: id, ...email_customer });
    }
  );
};
Email_customer.remove = (id, result) => {
  sql.query("DELETE FROM Email_customers WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Email_customer with id: ", id);
    result(null, res);
  });
};

Email_customer.removeAll = result => {
  sql.query("DELETE FROM Email_customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Email_customers`);
    result(null, res);
  });
};

module.exports = Email_customer;
