const sql = require("./db.js");
const Job_order = function(job_order) {

  this.jobs_id = job_order.jobs_id ;
  this.Jobs_Status= job_order.Jobs_Status;
  this.customers_id = job_order.customers_id ;
  this.Jobs_Customers_Company= job_order.Jobs_Customers_Company;
  this.Jobs_Service_Name = job_order.Jobs_Service_Name ;
  this.Jobs_Service_Code= job_order.Jobs_Service_Code;
  this.Jobs_Service_Name_Rate= job_order.Jobs_Service_Name_Rate;
  this.Jobs_Service_Hours_Estimate= job_order.Jobs_Service_Hours_Estimate;
  this.Jobs_Service_Hours_Estimate_Cost= job_order.Jobs_Service_Hours_Estimate_Cost;
  this.Jobs_Service_Mileage_Code= job_order.Jobs_Service_Mileage_Code;
  this.Jobs_Service_Mileage_Name = job_order.Jobs_Service_Mileage_Name ;
  this.Jobs_Service_Mileage_Rate= job_order.Jobs_Service_Mileage_Rate;
  this.Jobs_Service_Mileage_Estimate= job_order.Jobs_Service_Mileage_Estimate;
  this.Jobs_Service_Mileage_Cost_Estimate= job_order.Jobs_Service_Mileage_Cost_Estimate;
  this.Jobs_Travel_Time= job_order.Jobs_Travel_Time;
  this.Jobs_Travel_Time_Code= job_order.Jobs_Travel_Time_Code;
  this.Jobs_Travel_Time_Name = job_order.Jobs_Travel_Time_Name ;
  this.Jobs_Travel_Time_Rate= job_order.Jobs_Travel_Time_Rate;
  this.Jobs_Travel_Time_Estimate_Cost= job_order.Jobs_Travel_Time_Estimate_Cost;
  this.Jobs_Cancelation_Fee= job_order.Jobs_Cancelation_Fee;
  this.Jobs_Parking_Fees= job_order.Jobs_Parking_Fees;
  this.Jobs_No_Show= job_order.Jobs_No_Show;
  this.Jobs_Service_Total_Estimate= job_order.Jobs_Service_Total_Estimate;
  this.attachment_cust= job_order.attachment_cust;
  this.outcome= job_order.outcome;
  this.invoice_id= job_order.invoice_id;
};

Job_order.create = (newJob_order, result) => {
  sql.query("INSERT INTO Job_orders SET ?", newJob_order, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Job_order: ", { id: res.insertId, ...newJob_order });
    result(null, { id: res.insertId, ...newJob_order });
  });
};

Job_order.findById = (id, result) => {
  sql.query(`SELECT * FROM job_orders WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Job_order: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Job_order.getAll = (title, result) => {
  let query = "SELECT * FROM job_orders";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Job_orders: ", res);
    result(null, res);
  });
};

Job_order.getAllPublished = result => {
  sql.query("SELECT * FROM job_orders", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Job_orders: ", res);
    result(null, res);
  });
};

Job_order.updateById = (id, Job_order, result) => {
  sql.query(
    "UPDATE Job_orders SET title = ?, description = ?, published = ? WHERE id = ?",
    [Job_order.id, id],
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

      console.log("updated Job_order: ", { id: id, ...job_order });
      result(null, { id: id, ...job_order });
    }
  );
};

Job_order.remove = (id, result) => {
  sql.query("DELETE FROM Job_orders WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Job_order with id: ", id);
    result(null, res);
  });
};

Job_order.removeAll = result => {
  sql.query("DELETE FROM Job_orders", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Job_orders`);
    result(null, res);
  });
};

module.exports = Job_order;
