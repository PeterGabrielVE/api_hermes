const sql = require("./db.js");
const Service = function(Service) {
  
  this.Service_Name = Service.Service_Name;
  this.Service_State = Service.Service_State;
  this.Service_Code= Service.Service_Code;
  this.Service_Rate= Service.Service_Rate;
  this.Service_Cus_Number = Service.Service_Cus_Number;
  this.Service_Type = Service.Service_Type;
  this.attachments= Service.attachments;
  this.customer_id= Service.customer_id;
  this.language_id= Service.language_id;
  this.Services_offereds_id= Service.Services_offereds_id;
};

Service.create = (newService, result) => {
  sql.query("INSERT INTO Services SET ?", newService, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Service: ", { id: res.insertId, ...newService });
    result(null, { id: res.insertId, ...newService });
  });
};

Service.findById = (id, result) => {
  sql.query(`SELECT * FROM Services WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Service: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Invoice with the id
    result({ kind: "not_found" }, null);
  });
};

Service.getAll = (title, result) => {
  let query = "SELECT * FROM Services";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Services: ", res);
    result(null, res);
  });
};

Service.getAllPublished = result => {
  sql.query("SELECT * FROM Services", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Services: ", res);
    result(null, res);
  });
};

Service.updateById = (id, Service, result) => {
  sql.query(
    "UPDATE Services SET title = ?, description = ?, published = ? WHERE id = ?",
    [Service.id, id],
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

      console.log("updated Service: ", { id: id, ...Service });
      result(null, { id: id, ...Service });
    }
  );
};

Service.remove = (id, result) => {
  sql.query("DELETE FROM Services WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Service with id: ", id);
    result(null, res);
  });
};

Service.removeAll = result => {
  sql.query("DELETE FROM Services", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Services`);
    result(null, res);
  });
};

module.exports = Service;
