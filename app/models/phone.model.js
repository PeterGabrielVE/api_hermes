const sql = require("./db.js");
const Phone = function(phone) {
  this.title = phone.id;
};

Phone.create = (newPhone, result) => {
  sql.query("INSERT INTO Phones SET ?", newPhone, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Phone: ", { id: res.insertId, ...newPhone });
    result(null, { id: res.insertId, ...newPhone });
  });
};

Phone.findById = (id, result) => {
  sql.query(`SELECT * FROM phones WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Phone: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Phone.getAll = (title, result) => {
  let query = "SELECT * FROM phones";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Phones: ", res);
    result(null, res);
  });
};

Phone.getAllPublished = result => {
  sql.query("SELECT * FROM phones", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Phones: ", res);
    result(null, res);
  });
};

Phone.updateById = (id, Phone, result) => {
  sql.query(
    "UPDATE Phones SET title = ?, description = ?, published = ? WHERE id = ?",
    [Phone.id, id],
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

      console.log("updated Phone: ", { id: id, ...phone });
      result(null, { id: id, ...phone });
    }
  );
};

Phone.remove = (id, result) => {
  sql.query("DELETE FROM Phones WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Phone with id: ", id);
    result(null, res);
  });
};

Phone.removeAll = result => {
  sql.query("DELETE FROM Phones", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Phones`);
    result(null, res);
  });
};

module.exports = Phone;
