const sql = require("./db.js");
const Services_ne = function(services_ne) {

this.Service_Name= services_ne.Service_Name;
this.Service_State = services_ne.Service_State ;
this.Service_Code= services_ne.Service_Code;
this.Service_Rate= services_ne.Service_Rate;
this.Service_Type = services_ne.Service_Type ;
this.attachments= services_ne.attachments;
this.customer_id = services_ne.customer_id ;
this.language_id = services_ne.language_id ;
this.services_offereds_id = services_ne.services_offereds_id ;
this.service_request_field_id = services_ne.service_request_field_id ;
this.min_hour= services_ne.min_hour;
this.qualification_id = services_ne.qualification_id ;
};

Services_ne.create = (newServices_ne, result) => {
  sql.query("INSERT INTO Services_new SET ?", newServices_ne, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Services_ne: ", { id: res.insertId, ...newServices_ne });
    result(null, { id: res.insertId, ...newServices_ne });
  });
};

Services_ne.findById = (id, result) => {
  sql.query(`SELECT * FROM services_new WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Services_ne: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Services_ne.getAll = (title, result) => {
  let query = "SELECT * FROM services_new";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Services_new: ", res);
    result(null, res);
  });
};

Services_ne.getAllPublished = result => {
  sql.query("SELECT * FROM services_new", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Services_new: ", res);
    result(null, res);
  });
};

Services_ne.updateById = (id, Services_ne, result) => {
  sql.query(
    "UPDATE Services_new SET title = ?, description = ?, published = ? WHERE id = ?",
    [Services_ne.id, id],
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

      console.log("updated Services_ne: ", { id: id, ...services_ne });
      result(null, { id: id, ...services_ne });
    }
  );
};

Services_ne.remove = (id, result) => {
  sql.query("DELETE FROM Services_new WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Services_ne with id: ", id);
    result(null, res);
  });
};

Services_ne.removeAll = result => {
  sql.query("DELETE FROM Services_new", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Services_new`);
    result(null, res);
  });
};

module.exports = Services_ne;
