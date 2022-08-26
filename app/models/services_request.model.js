const sql = require("./db.js");
const Services_request = function(services_request) {

  this.service_request_status_id = services_request.service_request_status_id ;
  this.service_requested_id = services_request.service_requested_id ;
  this.service_type_id = services_request.service_type_id ;
  this.request_date= services_request.request_date;
  this.request_field_id = services_request.request_field_id ;
  this.service_start_date= services_request.service_start_date;
  this.service_start_hour= services_request.service_start_hour;
  this.service_end_date= services_request.service_end_date;
  this.service_end_hour= services_request.service_end_hour;
  this.cust_phone_number= services_request.cust_phone_number;
  this.cust_po_number= services_request.cust_po_number;
  this.address_customer= services_request.address_customer;
  this.address_city= services_request.address_city;
  this.address_state= services_request.address_state;
  this.address_zipcode= services_request.address_zipcode;
  this.lep_name= services_request.lep_name;
  this.lep_po_number	= services_request.lep_po_number	;
  this.lep_record_number= services_request.lep_record_number;
  this.job_zip_code= services_request.job_zip_code;
  this.address_job= services_request.address_job;
  this.address_job2= services_request.address_job2;
  this.job_city= services_request.job_city;
  this.job_state= services_request.job_state;
  this.requester_name= services_request.requester_name;
  this.distance_radius_jobs= services_request.distance_radius_jobs;
  this.customer_id = services_request.customer_id ;
  this.interpreter_id = services_request.interpreter_id ;
  this.name_job= services_request.name_job;
  this.dpto_job= services_request.dpto_job;
  this.phone_job= services_request.phone_job;
  this.job_departament= services_request.job_departament;
  this.provider_name= services_request.provider_name;
  this.email_job= services_request.email_job;
  this.contact_person= services_request.contact_person;
  this.service_email= services_request.service_email;
  this.service_avb_yes= services_request.service_avb_yes;
  this.service_avb_no= services_request.service_avb_no;
  this.service_avb_nvr= services_request.service_avb_nvr;
  this.cus_notes= services_request.cus_notes;
  this.language_id = services_request.language_id ;
  this.job_service_id = services_request.job_service_id ;
  this.estimate_quote_id = services_request.estimate_quote_id ;
  this.created_by= services_request.created_by;
  this.worked_by= services_request.worked_by;
  this.other_email= services_request.other_email;
  this.qualification_id= services_request.qualification_id;
};

Services_request.create = (newServices_request, result) => {
  sql.query("INSERT INTO Services_requests SET ?", newServices_request, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Services_request: ", { id: res.insertId, ...newServices_request });
    result(null, { id: res.insertId, ...newServices_request });
  });
};

Services_request.findById = (id, result) => {
  sql.query(`SELECT * FROM services_requests WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Services_request: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Invoice with the id
    result({ kind: "not_found" }, null);
  });
};

Services_request.getAll = (title, result) => {
  let query = "SELECT * FROM services_requests";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Services_requests: ", res);
    result(null, res);
  });
};

Services_request.getAllPublished = result => {
  sql.query("SELECT * FROM services_requests", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Services_requests: ", res);
    result(null, res);
  });
};

Services_request.updateById = (id, Services_request, result) => {
  sql.query(
    "UPDATE Services_requests SET title = ?, description = ?, published = ? WHERE id = ?",
    [Services_request.id, id],
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

      console.log("updated Services_request: ", { id: id, ...services_request });
      result(null, { id: id, ...services_request });
    }
  );
};

Services_request.remove = (id, result) => {
  sql.query("DELETE FROM Services_requests WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Services_request with id: ", id);
    result(null, res);
  });
};

Services_request.removeAll = result => {
  sql.query("DELETE FROM Services_requests", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Services_requests`);
    result(null, res);
  });
};

module.exports = Services_request;
