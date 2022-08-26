const sql = require("./db.js");
const Customer_service_state = function(customer_service_state) {
  this.customer_id = customer_service_state.customer_id;
  this.state_id = customer_service_state.state_id;
  this.service_id = customer_service_state.service_id;
};

Customer_service_state.create = (newCustomer_service_state, result) => {
  sql.query("INSERT INTO Customer_service_states SET ?", newCustomer_service_state, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Customer_service_state: ", { id: res.insertId, ...newCustomer_service_state });
    result(null, { id: res.insertId, ...newCustomer_service_state });
  });
};

Customer_service_state.findById = (id, result) => {
  sql.query(`SELECT * FROM customer_service_states WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Customer_service_state: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Customer_service_state.getAll = (title, result) => {
  let query = "SELECT * FROM customer_service_states";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Customer_service_states: ", res);
    result(null, res);
  });
};

Customer_service_state.getAllPublished = result => {
  sql.query("SELECT * FROM Customer_service_states", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Customer_service_states: ", res);
    result(null, res);
  });
};

Customer_service_state.updateById = (id, Customer_service_state, result) => {
  sql.query(
    "UPDATE Customer_service_states SET title = ?, description = ?, published = ? WHERE id = ?",
    [Customer_service_state.id, id],
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

      console.log("updated Customer_service_state: ", { id: id, ...customer_service_state });
      result(null, { id: id, ...customer_service_state });
    }
  );
};

Customer_service_state.remove = (id, result) => {
  sql.query("DELETE FROM Customer_service_states WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Customer_service_state with id: ", id);
    result(null, res);
  });
};
Customer_service_state.removeAll = result => {
  sql.query("DELETE FROM Customer_service_states", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Customer_service_states`);
    result(null, res);
  });
};

module.exports = Customer_service_state;