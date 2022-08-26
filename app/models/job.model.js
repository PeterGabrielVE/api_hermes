const sql = require("./db.js");
const Job = function(job) {

    this.Job_Request_Date= job.Job_Request_Date;
    this.Jobs_Job_Name = job.Jobs_Job_Name ;
    this.Jobs_Type= job.Jobs_Type;
    this.Jobs_Special_Request = job.Jobs_Special_Request ;
    this.Jobs_LEP_Name = job.Jobs_LEP_Name ;
    this.Jobs_LEP_Phone= job.Jobs_LEP_Phone;
    this.Jobs_LEP_Record_Number= job.Jobs_LEP_Record_Number;
    this.Jobs_Language_Requested = job.Jobs_Language_Requested ;
    this.Jobs_Customers_First= job.Jobs_Customers_First;
    this.Jobs_Customers_Last = job.Jobs_Customers_Last ;
    this.Jobs_Customers_PO_Number= job.Jobs_Customers_PO_Number;
    this.Jobs_Assignment_Provider_Name =job.Jobs_Assignment_Provider_Name ;
    this.Jobs_Assignment_Location= job.Jobs_Assignment_Location;
    this.Jobs_Assignment_Department = job.Jobs_Assignment_Department ;
    this.Jobs_Assignment_Contact_Person = job.Jobs_Assignment_Contact_Person ;
    this.Jobs_Assignment_Phone_Number= job.Jobs_Assignment_Phone_Number;
    this.Jobs_Assignment_Email= job.Jobs_Assignment_Email;
    this.Jobs_Assignment_Street_Address_1= job.Jobs_Assignment_Street_Address_1;
    this.Jobs_Assignment_Street_Address_2= job.Jobs_Assignment_Street_Address_2;
    this.Jobs_Assignment_State= job.Jobs_Assignment_State;
    this.Jobs_Assignment_City= job.Jobs_Assignment_City;
    this.Jobs_Assignment_Zip= job.Jobs_Assignment_Zip;
    this.Jobs_Start_Time= job.Jobs_Start_Time;
    this.Jobs_Start_Date= job.Jobs_Start_Date;
    this.Jobs_Start_Hour= job.Jobs_Start_Hour;
    this.Jobs_End_Time= job.Jobs_End_Time;
    this.Jobs_End_Date= job.Jobs_End_Date;
    this.Jobs_End_Hour= job.Jobs_End_Hour;
    this.Jobs_Notes = job.Jobs_Notes ;
    this.Jobs_Notes_Post = job.Jobs_Notes_Post ;
    this.Jobs_Attachments= job.Jobs_Attachments;
    this.Job_Fullfillment_Notes = job.Job_Fullfillment_Notes ;
    this.Job_Assignment_Dpto= job.Job_Assignment_Dpto;
    this.job_service_id= job.job_service_id;
    this.job_field_id= job.job_field_id;
    this.outcome= job.outcome;
    this.jobs_description_2= job.jobs_description_2;
};

Job.create = (newJob, result) => {
  sql.query("INSERT INTO Jobs SET ?", newJob, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Job: ", { id: res.insertId, ...newJob });
    result(null, { id: res.insertId, ...newJob });
  });
};

Job.findById = (id, result) => {
  sql.query(`SELECT * FROM jobs WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Job: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Invoice with the id
    result({ kind: "not_found" }, null);
  });
};

Job.getAll = (title, result) => {
  let query = "SELECT * FROM jobs";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Jobs: ", res);
    result(null, res);
  });
};

Job.getAllPublished = result => {
  sql.query("SELECT * FROM jobs", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Jobs: ", res);
    result(null, res);
  });
};

Job.updateById = (id, Job, result) => {
  sql.query(
    "UPDATE Jobs SET title = ?, description = ?, published = ? WHERE id = ?",
    [Job.id, id],
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

      console.log("updated Job: ", { id: id, ...job });
      result(null, { id: id, ...job });
    }
  );
};

Job.remove = (id, result) => {
  sql.query("DELETE FROM Jobs WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Job with id: ", id);
    result(null, res);
  });
};

Job.removeAll = result => {
  sql.query("DELETE FROM Jobs", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Jobs`);
    result(null, res);
  });
};

module.exports = Job;
