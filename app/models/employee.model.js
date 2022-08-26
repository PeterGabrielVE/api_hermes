const sql = require("./db.js");
const Employee = function(employee) {
  this.person_id = employee.person_id;
  this.state = employee.state;
  this.city = employee.city;
  this.zip = employee.zip;
  this.main_email = employee.main_email;
  this.main_telephone = employee.main_telephone;
  this.Address = employee.Address;
  this.county = employee.county;
  this.apt_suite = employee.apt_suite;

};

Employee.create = (newEmployee, result) => {
  sql.query("INSERT INTO Employees SET ?", newEmployee, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Employee: ", { id: res.insertId, ...newEmployee});
    result(null, { id: res.insertId, ...newEmployee });
  });
};

Employee.findById = (id, result) => {
  sql.query(`SELECT * FROM employees WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Employee: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Employee.getAll = (title, result) => {
  let query = "SELECT * FROM employees";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Employees: ", res);
    result(null, res);
  });
};

Employee.getAllPublished = result => {
  sql.query("SELECT * FROM employees", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Employees: ", res);
    result(null, res);
  });
};

Employee.updateById = (id, Employee, result) => {
  sql.query(
    "UPDATE Employees SET title = ?, description = ?, published = ? WHERE id = ?",
    [Employee.id, id],
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

      console.log("updated Employee: ", { id: id, ...employee });
      result(null, { id: id, ...Employee });
    }
  );
};

Employee.remove = (id, result) => {
  sql.query("DELETE FROM Employees WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Employee with id: ", id);
    result(null, res);
  });
};

Employee.removeAll = result => {
  sql.query("DELETE FROM Employees", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Employees`);
    result(null, res);
  });
};

module.exports = Employee;