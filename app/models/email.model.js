const sql = require("./db.js");
const Email = function(email) {
  this.title = email.id;
};

Email.create = (newEmail, result) => {
  sql.query("INSERT INTO Emails SET ?", newEmail, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Email: ", { id: res.insertId, ...newEmail });
    result(null, { id: res.insertId, ...newEmail });
  });
};

Email.findById = (id, result) => {
  sql.query(`SELECT * FROM emails WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Email: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Email.getAll = (title, result) => {
  let query = "SELECT * FROM emails";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Emails: ", res);
    result(null, res);
  });
};

Email.getAllPublished = result => {
  sql.query("SELECT * FROM emails", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Emails: ", res);
    result(null, res);
  });
};

Email.updateById = (id, Email, result) => {
  sql.query(
    "UPDATE Emails SET title = ?, description = ?, published = ? WHERE id = ?",
    [Email.id, id],
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

      console.log("updated Email: ", { id: id, ...email });
      result(null, { id: id, ...email });
    }
  );
};

Email.remove = (id, result) => {
  sql.query("DELETE FROM Emails WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Email with id: ", id);
    result(null, res);
  });
};

Email.removeAll = result => {
  sql.query("DELETE FROM Emails", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Emails`);
    result(null, res);
  });
};

module.exports = Email;
