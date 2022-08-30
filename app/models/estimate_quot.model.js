const sql = require("./db.js");
const Estimate_quot = function(estimate_quot) {

  this.customer_id = estimate_quot.customer_id ;
  this.interpreter_id = estimate_quot.interpreter_id ;
  this.service_request_id= estimate_quot.service_request_id;
  this.job_id= estimate_quot.job_id;
  this.service_email= estimate_quot.service_email;
  this.service_avb_yes= estimate_quot.service_avb_yes;
  this.service_avb_no= estimate_quot.service_avb_no;
  this.service_avb_nvr= estimate_quot.service_avb_nvr;
  this.service_request_status = estimate_quot.service_request_status ;
  this.service_name = estimate_quot.service_name ;
  this.service_code= estimate_quot.service_code;
  this.service_rate= estimate_quot.service_rate;
  this.service_rate_hrs= estimate_quot.service_rate_hrs;
  this.service_rate_cost= estimate_quot.service_rate_cost;
  this.mileage_name = estimate_quot.mileage_name ;
  this.mileage_code= estimate_quot.mileage_code;
  this.mileage_rate= estimate_quot.mileage_rate;
  this.mileage_mls= estimate_quot.mileage_mls;
  this.mileage_cost= estimate_quot.mileage_cost;
  this.travel_name = estimate_quot.travel_name ;
  this.travel_code= estimate_quot.travel_code;
  this.travel_time= estimate_quot.travel_time;
  this.travel_hrs= estimate_quot.travel_hrs;
  this.travel_cost= estimate_quot.travel_cost;
  this.no_show= estimate_quot.no_show;
  this.cancelation= estimate_quot.cancelation;
  this.total	= estimate_quot.total	;
  this.special_instructions= estimate_quot.special_instructions;
  this.total_onsite= estimate_quot.total_onsite;
  this.total_perhour= estimate_quot.total_perhour;
  this.total_perminute= estimate_quot.total_perminute;
  this.total_perword= estimate_quot.total_perword;
  this.total_perpage= estimate_quot.total_perpage;
  this.total_perproject= estimate_quot.total_perproject;
  this.total_perday= estimate_quot.total_perday;
  this.total_perclass= estimate_quot.total_perclass;
  this.pages= estimate_quot.pages;
  this.words= estimate_quot.words;
  this.minimum= estimate_quot.minimum;
  this.dist_permile= estimate_quot.dist_permile;
  this.per_hour= estimate_quot.per_hour;
  this.per_minute= estimate_quot.per_minute;
  this.per_page= estimate_quot.per_page;
  this.per_word= estimate_quot.per_word;
  this.per_day= estimate_quot.per_day;
  this.per_class= estimate_quot.per_class;
  this.int_cancelation= estimate_quot.int_cancelation;
  this.int_no_show= estimate_quot.int_no_show;
  this.int_travel_time_hours= estimate_quot.int_travel_time_hours;
  this.int_travel_time_rate= estimate_quot.int_travel_time_rate;
  this.int_total_travel_time= estimate_quot.int_total_travel_time;
  this.per_mile= estimate_quot.per_mile;
  this.dist= estimate_quot.dist;
};

Estimate_quot.create = (newEstimate_quot, result) => {
  sql.query("INSERT INTO Estimate_quote SET ?", newEstimate_quot, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Estimate_quot: ", { id: res.insertId, ...newEstimate_quot });
    result(null, { id: res.insertId, ...newEstimate_quot });
  });
};

Estimate_quot.findById = (id, result) => {
  sql.query(`SELECT * FROM estimate_quote WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Estimate_quot: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Estimate_quot.getAll = (title, result) => {
  let query = "SELECT * FROM estimate_quote";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Estimate_quote: ", res);
    result(null, res);
  });
};

Estimate_quot.getAllPublished = result => {
  sql.query("SELECT * FROM estimate_quote", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Estimate_quote: ", res);
    result(null, res);
  });
};

Estimate_quot.updateById = (id, Estimate_quot, result) => {
  sql.query(
    "UPDATE Estimate_quote SET title = ?, description = ?, published = ? WHERE id = ?",
    [Invoice.id, id],
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

      console.log("updated Estimate_quot: ", { id: id, ...estimate_quot });
      result(null, { id: id, ...Estimate_quot });
    }
  );
};

Estimate_quot.remove = (id, result) => {
  sql.query("DELETE FROM Estimate_quote WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Estimate_quot with id: ", id);
    result(null, res);
  });
};

Estimate_quot.removeAll = result => {
  sql.query("DELETE FROM Estimate_quote", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Estimate_quote`);
    result(null, res);
  });
};

module.exports = Estimate_quot;
