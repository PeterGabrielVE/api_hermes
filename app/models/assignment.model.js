const sql = require("./db.js");

// constructor
const Assignment = function(Assignment) {
  this.jobs_id = assignment.jobs_id ;
  this.Jobs_Status = assignment.Jobs_Status ;
  this.contractors_id = assignment.contractors_id ;
 this.contractors_First_Name = assignment.contractors_First_Name ;
 this.contractors_Last_Name = assignment.contractors_Last_Name ;
  this.contractors_Con_Agency_Name = assignment.contractors_Con_Agency_Name ;
  this.contractors_Home_Phone = assignment.contractors_Home_Phone ;
  this.contractors_Cell_Phone = assignment.contractors_Cell_Phone ;
  this.contractors_Email = assignment.contractors_Email ;
  this.os_ph = assignment.os_ph ;
  this.os_minimum = assignment.os_minimum ;
  this.os_subtotal = assignment.os_subtotal ;
 this.os_permile = assignment.os_permile ;
  this.os_dist = assignment.os_dist ;
  this.os_distmile = assignment.os_distmile ;
  this.os_total = assignment.os_total ;
 this.tv_ph = assignment.tv_ph ;
  this.tv_mph = assignment.tv_mph ;
 this.tv_totalph = assignment.tv_totalph ;
  this.tv_pm = assignment.tv_pm ;
  this.tv_mpm = assignment.tv_mpm ;
  this.tv_totalpm = assignment.tv_totalpm ;
  this.check_vt_ph = assignment.check_vt_ph ;
  this.check_vt_pm = assignment.check_vt_pm ;
  this.t_pw = assignment.t_pw ;
  this.t_words = assignment.t_words ;
  this.t_totalpw = assignment.t_totalpw ;
  this.t_pp = assignment.t_pp ;
  this.t_pages = assignment.t_pages ;
  this.t_totalpp = assignment.t_totalpp ;
 this.t_ph = assignment.t_ph ;
  this.t_mph = assignment.t_mph ;
  this.t_totalph = assignment.t_totalph ;
  this.t_ppt = assignment.t_ppt ;
  this.check_t_pw = assignment.check_t_pw ;
  this.check_t_pp = assignment.check_t_pp ;
 this.check_t_ph = assignment.check_t_ph ;
  this.check_t_ppt = assignment.check_t_ppt ;
  this.int_cancelation = assignment.int_cancelation ;
  this.int_no_show = assignment.int_no_show ;
 this.int_travel_time_hours = assignment.int_travel_time_hours ;
 this.int_travel_time_rate = assignment.int_travel_time_rate ;
  this.int_total_travel_time = assignment.int_total_travel_time ;
 this.int_total = assignment.int_total ;
 this.int_parking_tolls = assignment.int_parking_tolls ;
  this.tp_ph = assignment.tp_ph ;
  this.tp_mph = assignment.tp_mph ;
  this.tp_totalph = assignment.tp_totalph ;
  this.tp_permileh = assignment.tp_permileh ;
  this.tp_disth = assignment.tp_disth ;
  this.tp_distmileh = assignment.tp_distmileh ;
  this.tp_totalmilehour = assignment.tp_totalmilehour ;
  this.tp_pm = assignment.tp_pm ;
  this.tp_mpm = assignment.tp_mpm ;
  this.tp_totalpm = assignment.tp_totalpm ;
  this.tp_permilem = assignment.tp_permilem ;
  this.tp_distm = assignment.tp_distm ;
  this.tp_distmilem = assignment.tp_distmilem ;
  this.tp_totalmileminute = assignment.tp_totalmileminute ;
 this.check_tp_ph = assignment.check_tp_ph ;
  this.check_tp_pm = assignment.check_tp_pm ;
  this.trin_ph = assignment.trin_ph ;
  this.trin_mph = assignment.trin_mph ;
 this. trin_totalph = assignment.trin_totalph ;
  this.trin_pd = assignment.trin_pd ;
  this.trin_mpd = assignment.trin_mpd ;
  this.trin_totalpd = assignment.trin_totalpd ;
  this.trin_pc = assignment.trin_pc ;
 this.trin_mpc = assignment.trin_mpc ;
  this.trin_totalpc = assignment.trin_totalpc ;
  this.check_trin_ph = assignment.check_trin_ph ;
  this.check_trin_pd = assignment.check_trin_pd ;
  this.check_trin_pc = assignment.check_trin_pc ;
  this.attachment_int = assignment.attachment_int ;
};

Assignment.create = (newAssignment, result) => {
  sql.query("INSERT INTO Assignments SET ?", newAssignment, (err, res) => {
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
