const sql = require("./db.js");
const Request_customer = function(request_customer) {

  this.Job_Name= request_customer.Job_Name;
  this.Cus_Last_Name= request_customer.Cus_Last_Name;
  this.Cus_Company_Name= request_customer.Cus_Company_Name;
  this.Cus_Contact_Number= request_customer.Cus_Contact_Number;
  this.ext_customer= request_customer.ext_customer;
  this.Cus_Email= request_customer.Cus_Email;
  this.Cus_Language_Needed= request_customer.Cus_Language_Needed;
  this.Cus_Location= request_customer.Cus_Location,
  this.Cus_City= request_customer.Cus_City;
  this.Cus_State= request_customer.Cus_State;
  this.Cus_Zip= request_customer.Cus_Zip;
  this.Cus_Translation_Date= request_customer.Cus_Translation_Date;
  this.Cus_Hours= request_customer.Cus_Hours;
  this.Cus_Phone_Number= request_customer.Cus_Phone_Number;
  this.Cus_Record_Claim= request_customer.Cus_Record_Claim;
  this.Cus_Gender= request_customer.Cus_Gender;
  this.Cus_Notes= request_customer.Cus_Notes;
  this.Cus_Language_Document= request_customer.Cus_Language_Document;
  this.Cus_Translation_Document	= request_customer.Cus_Translation_Document	;
  this.Cus_Customer= request_customer.Cus_Customer;
  this.Cus_Service_Request= request_customer.Cus_Service_Request;
  this.Cus_Type_Request= request_customer.Cus_Type_Request;
  this.Cus_Billing_Address= request_customer.Cus_Billing_Address;
  this.Cus_Birthday= request_customer.Cus_Birthday;
  this.Cus_File= request_customer.Cus_File;
  this.Cus_Po_Number= request_customer.Cus_Po_Number;
  this.Cus_Phone_2= request_customer.Cus_Phone_2;
  this.Cus_Telephonic_Date= request_customer.Cus_Telephonic_Date;
  this.Cus_tel_lep_name= request_customer.Cus_tel_lep_name;
  this.Cus_tel_lep_phone= request_customer.Cus_tel_lep_phone;
  this.Cus_Tel_Call_Be= request_customer.Cus_Tel_Call_Be;
  this.Cus_Tel_Initial= request_customer.Cus_Tel_Initial;
  this.Cus_Training_Date= request_customer.Cus_Training_Date;
  this.Cus_Status= request_customer.Cus_Status;
  this.Cus_Description= request_customer.Cus_Description;
  this.Cus_Service_Start= request_customer.Cus_Service_Start;
  this.Cus_Service_End= request_customer.Cus_Service_End;
  this.Cus_Hours_end= request_customer.Cus_Hours_end;
  this.Cus_Address= request_customer.Cus_Address;
  this.Job_Address= request_customer.Job_Address;
  this.Cus_Requester_Name= request_customer.Cus_Requester_Name;
  this.Job_Departament= request_customer.Job_Departament;
  this.Job_Apt_Suite= request_customer.Job_Apt_Suite;
  this.Job_City= request_customer.Job_City;
  this.Job_State= request_customer.Job_State;
  this.Job_Assig_Cust_Email= request_customer.Job_Assig_Cust_Email;
  this.Job_Contact_Person= request_customer.Job_Contact_Person;
  this.Job_Provider_Name= request_customer.Job_Provider_Name;
  this.Job_Phone= request_customer.Job_Phone;
  this.Job_Zip_Code= request_customer.Job_Zip_Code;
  this.Cus_b_term= request_customer.Cus_b_term;
  this.Cus_field= request_customer.Cus_field;
};

Request_customer.create = (newRequest_customer, result) => {
  sql.query("INSERT INTO Request_customers SET ?", newRequest_customer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Request_customer: ", { id: res.insertId, ...newRequest_customer });
    result(null, { id: res.insertId, ...newRequest_customer });
  });
};

Request_customer.findById = (id, result) => {
  sql.query(`SELECT * FROM request_customers WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Request_customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Invoice with the id
    result({ kind: "not_found" }, null);
  });
};

Request_customer.getAll = (title, result) => {
  let query = "SELECT * FROM request_customers";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Request_customers: ", res);
    result(null, res);
  });
};

Request_customer.getAllPublished = result => {
  sql.query("SELECT * FROM request_customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Request_customers: ", res);
    result(null, res);
  });
};

Request_customer.updateById = (id, Request_customer, result) => {
  sql.query(
    "UPDATE Request_customers SET title = ?, description = ?, published = ? WHERE id = ?",
    [Request_customer.id, id],
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

      console.log("updated Request_customer: ", { id: id, ...request_customer });
      result(null, { id: id, ...request_customer });
    }
  );
};

Request_customer.remove = (id, result) => {
  sql.query("DELETE FROM Request_customers WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Request_customer with id: ", id);
    result(null, res);
  });
};

Request_customer.removeAll = result => {
  sql.query("DELETE FROM Request_customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Request_customers`);
    result(null, res);
  });
};

module.exports = Request_customer;
