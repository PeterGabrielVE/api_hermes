const sql = require("./db.js");

// constructor
const Bill = function(Bill) {
  this.title = Bill.id;
};

Bill.create = (newBill, result) => {
  sql.query("INSERT INTO Bill SET ?", newBill, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Bill: ", { id: res.insertId, ...newBill });
    result(null, { id: res.insertId, ...newBill });
  });
};

Bill.findById = (id, result) => {
  sql.query(`SELECT * FROM Bill WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Bill: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Agencie with the id
    result({ kind: "not_found" }, null);
  });
};

Bill.getAll = (title, result) => {
  let query = "SELECT * FROM Bills";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Bills: ", res);
    result(null, res);
  });
};

Bill.getAllPublished = result => {
  sql.query("SELECT * FROM Bills", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Bills: ", res);
    result(null, res);
  });
};

Bill.updateById = (id, Bill, result) => {
  sql.query(
    "UPDATE Bills SET title = ?, description = ?, published = ? WHERE id = ?",
    [Bill.id, id],
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

      console.log("updated Bill: ", { id: id, ...Bill });
      result(null, { id: id, ...Bill });
    }
  );
};

Bill.remove = (id, result) => {
  sql.query("DELETE FROM Bills WHERE id = ?", id, (err, res) => {
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

    console.log("deleted Bill with id: ", id);
    result(null, res);
  });
};

Bill.removeAll = result => {
  sql.query("DELETE FROM Bills", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Bills`);
    result(null, res);
  });
};

module.exports = Bill;
