const sql = require("./db.js");

// constructor
const Assignment = function(Assignment) {

  this.jobs_id = Assignment.jobs_id ;
  this.Jobs_Status = Assignment.Jobs_Status ;
  this.contractors_id = Assignment.contractors_id ;
 this.contractors_First_Name = Assignment.contractors_First_Name ;
 this.contractors_Last_Name = Assignment.contractors_Last_Name ;
  this.contractors_Con_Agency_Name = Assignment.contractors_Con_Agency_Name ;
  this.contractors_Home_Phone = Assignment.contractors_Home_Phone ;
  this.contractors_Cell_Phone = Assignment.contractors_Cell_Phone ;
  this.contractors_Email = Assignment.contractors_Email ;
  this.os_ph = Assignment.os_ph ;
  this.os_minimum = Assignment.os_minimum ;
  this.os_subtotal = Assignment.os_subtotal ;
 this.os_permile = Assignment.os_permile ;
  this.os_dist = Assignment.os_dist ;
  this.os_distmile = Assignment.os_distmile ;
  this.os_total = Assignment.os_total ;
 this.tv_ph = Assignment.tv_ph ;
  this.tv_mph = Assignment.tv_mph ;
 this.tv_totalph = Assignment.tv_totalph ;
  this.tv_pm = Assignment.tv_pm ;
  this.tv_mpm = Assignment.tv_mpm ;
  this.tv_totalpm = Assignment.tv_totalpm ;
  this.check_vt_ph = Assignment.check_vt_ph ;
  this.check_vt_pm = Assignment.check_vt_pm ;
  this.t_pw = Assignment.t_pw ;
  this.t_words = Assignment.t_words ;
  this.t_totalpw = Assignment.t_totalpw ;
  this.t_pp = Assignment.t_pp ;
  this.t_pages = Assignment.t_pages ;
  this.t_totalpp = Assignment.t_totalpp ;
 this.t_ph = Assignment.t_ph ;
  this.t_mph = Assignment.t_mph ;
  this.t_totalph = Assignment.t_totalph ;
  this.t_ppt = Assignment.t_ppt ;
  this.check_t_pw = Assignment.check_t_pw ;
  this.check_t_pp = Assignment.check_t_pp ;
 this.check_t_ph = Assignment.check_t_ph ;
  this.check_t_ppt = Assignment.check_t_ppt ;
  this.int_cancelation = Assignment.int_cancelation ;
  this.int_no_show = Assignment.int_no_show ;
 this.int_travel_time_hours = Assignment.int_travel_time_hours ;
 this.int_travel_time_rate = Assignment.int_travel_time_rate ;
  this.int_total_travel_time = Assignment.int_total_travel_time ;
 this.int_total = Assignment.int_total ;
 this.int_parking_tolls = Assignment.int_parking_tolls ;
  this.tp_ph = Assignment.tp_ph ;
  this.tp_mph = Assignment.tp_mph ;
  this.tp_totalph = Assignment.tp_totalph ;
  this.tp_permileh = Assignment.tp_permileh ;
  this.tp_disth = Assignment.tp_disth ;
  this.tp_distmileh = Assignment.tp_distmileh ;
  this.tp_totalmilehour = Assignment.tp_totalmilehour ;
  this.tp_pm = Assignment.tp_pm ;
  this.tp_mpm = Assignment.tp_mpm ;
  this.tp_totalpm = Assignment.tp_totalpm ;
  this.tp_permilem = Assignment.tp_permilem ;
  this.tp_distm = Assignment.tp_distm ;
  this.tp_distmilem = Assignment.tp_distmilem ;
  this.tp_totalmileminute = Assignment.tp_totalmileminute ;
 this.check_tp_ph = Assignment.check_tp_ph ;
  this.check_tp_pm = Assignment.check_tp_pm ;
  this.trin_ph = Assignment.trin_ph ;
  this.trin_mph = Assignment.trin_mph ;
 this. trin_totalph = Assignment.trin_totalph ;
  this.trin_pd = Assignment.trin_pd ;
  this.trin_mpd = Assignment.trin_mpd ;
  this.trin_totalpd = Assignment.trin_totalpd ;
  this.trin_pc = Assignment.trin_pc ;
 this.trin_mpc = Assignment.trin_mpc ;
  this.trin_totalpc = Assignment.trin_totalpc ;
  this.check_trin_ph = Assignment.check_trin_ph ;
  this.check_trin_pd = Assignment.check_trin_pd ;
  this.check_trin_pc = Assignment.check_trin_pc ;
  this.attachment_int = Assignment.attachment_int ;
};

Assignment.create = (newAssignment, result) => {
  sql.query("INSERT INTO assignments SET ?", newAssignment, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Assignment: ", { id: res.insertId, ...newAssignment });
    result(null, { id: res.insertId, ...newAssignment });
  });
};

Assignment.findById = (id, result) => {
  sql.query(`SELECT * FROM Assignments WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Assignment: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found  with the id
    result({ kind: "not_found" }, null);
  });
};

Assignment.getAll = (title, result) => {
  let query = "SELECT * FROM Assignments";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Assignments: ", res);
    result(null, res);
  });
};

Assignment.getAllPublished = result => {
  sql.query("SELECT * FROM Assignments", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Assignments: ", res);
    result(null, res);
  });
};

Assignment.updateById = (id,Assignment, result) => {
  sql.query(
    "UPDATE Assignments SET title = ?, description = ?, published = ? WHERE id = ?",
    [Assignment.id, id],
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

      console.log("updated Assignment: ", { id: id, ...Assignment });
      result(null, { id: id, ...Assignment });
    }
  );
};

Assignment.remove = (id, result) => {
  sql.query("DELETE FROM Assignments WHERE id = ?", id, (err, res) => {
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

    console.log("deleted Assignment with id: ", id);
    result(null, res);
  });
};

Assignment.removeAll = result => {
  sql.query("DELETE FROM Assignments", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Assignments`);
    result(null, res);
  });
};

module.exports = Assignment;
