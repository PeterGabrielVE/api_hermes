const sql = require("./db.js");
const Request_customer = function(request_customer) {
  this.title = request_customer.id;
};

Request_customer.create = (newRequest_customer, result) => {
  sql.query("INSERT INTO Request_customers SET ?", newRequest_customer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Request_customer: ", { id: res.insertId, ...newRequest_customer });
    result(null, { id: res.insertId, ...newRequest_customer });
  });
};

Request_customer.findById = (id, result) => {
  sql.query(`SELECT * FROM request_customers WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Request_customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Invoice with the id
    result({ kind: "not_found" }, null);
  });
};

Request_customer.getAll = (title, result) => {
  let query = "SELECT * FROM request_customers";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Request_customers: ", res);
    result(null, res);
  });
};

Request_customer.getAllPublished = result => {
  sql.query("SELECT * FROM request_customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Request_customers: ", res);
    result(null, res);
  });
};

Request_customer.updateById = (id, Request_customer, result) => {
  sql.query(
    "UPDATE Request_customers SET title = ?, description = ?, published = ? WHERE id = ?",
    [Request_customer.id, id],
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

      console.log("updated Request_customer: ", { id: id, ...request_customer });
      result(null, { id: id, ...request_customer });
    }
  );
};

Request_customer.remove = (id, result) => {
  sql.query("DELETE FROM Request_customers WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Request_customer with id: ", id);
    result(null, res);
  });
};

Request_customer.removeAll = result => {
  sql.query("DELETE FROM Request_customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Request_customers`);
    result(null, res);
  });
};

module.exports = Request_customer;
