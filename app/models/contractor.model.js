const sql = require("./db.js");
const Contractor = function(contractor) {
  
  this.Con_Suffix= contractor.Con_Suffix;
  this.Con_First_Name = contractor.Con_First_Name ;
  this.Con_Last_Name= contractor.Con_Last_Name;
  this.Con_Middle_Name = contractor.Con_Middle_Name ;
  this.Con_Agency_Name= contractor.Con_Agency_Name;
  this.Con_DBA= contractor.Con_DBA;
  this.Con_Street_Address_1= contractor.Con_Street_Address_1;
  this.Con_Street_Address_2= contractor.Con_Street_Address_2;
  this.Con_City= contractor.Con_City;
  this.Con_State= contractor.Con_State;
  this.Con_Zip= contractor.Con_Zip;
  this.Con_County= contractor.Con_County;
  this.Con_Home_Phone= contractor.Con_Home_Phone;
  this.Con_Fax_Phone= contractor.Con_Fax_Phone;
  this.Con_Cell_Phone= contractor.Con_Cell_Phone;
  this.Con_E_mail_Address= contractor.Con_E_mail_Address;
  this.Con_Website= contractor.Con_Website;
  this.Con_Skype= contractor.Con_Skype;
  this.Con_Linkedin= contractor.Con_Linkedin;
  this.Con_Proz= contractor.Con_Proz;
  this.Con_TaxID= contractor.Con_TaxID;
  this.Con_Birthdate= contractor.Con_Birthdate;
  this.Con_Sex= contractor.Con_Sex;
  this.Con_Language_1= contractor.Con_Language_1;
  this.Con_Notes = contractor.Con_Notes ;
  this.Con_Availability_Monday= contractor.Con_Availability_Monday;
  this.Con_Avaiability_Monday_Start= contractor.Con_Avaiability_Monday_Start;
  this.Con_Avaiability_Monday_End= contractor.Con_Avaiability_Monday_End;
  this.Con_Availability_Tuesday= contractor.Con_Availability_Tuesday;
  this.Con_Avaiability_Tuesday_Start= contractor.Con_Avaiability_Tuesday_Start;
  this.Con_Avaiability_Tuesday_End= contractor.Con_Avaiability_Tuesday_End;
  this.Con_Availability_Wednesday= contractor.Con_Availability_Wednesday;
  this.Con_Avaiability_Wednesday_Start= contractor.Con_Avaiability_Wednesday_Start;
  this.Con_Avaiability_Webnesday_End= contractor.Con_Avaiability_Webnesday_End;
  this.Con_Availability_Thursday= contractor.Con_Availability_Thursday;
  this.Con_Avaiability_Thursday_Start= contractor.Con_Avaiability_Thursday_Start;
  this.Con_Avaiability_Thursday_End= contractor.Con_Avaiability_Thursday_End;
  this.Con_Availability_Friday= contractor.Con_Availability_Friday;
  this.Con_Avaiability_Friday_Start= contractor.Con_Avaiability_Friday_Start;
  this.Con_Avaiability_Friday_End= contractor.Con_Avaiability_Friday_End;
  this.Con_Availability_Saturday= contractor.Con_Availability_Saturday;
  this.Con_Avaiability_Saturday_Start= contractor.Con_Avaiability_Saturday_Start;
  this.Con_Avaiability_Saturday_End= contractor.Con_Avaiability_Saturday_End;
  this.Con_Availability_Sunday= contractor.Con_Availability_Sunday;
  this.Con_Avaiability_Sunday_Start= contractor.Con_Avaiability_Sunday_Start;
  this.Con_Avaiability_Sunday_End= contractor.Con_Avaiability_Sunday_End;
  this.Con_Education_Degree= contractor.Con_Education_Degree;
  this.Con_Yearsschool= contractor.Con_Yearsschool;
  this.Con_Additional_Info = contractor.Con_Additional_Info ;
  this.Con_Attachments= contractor.Con_Attachments;
  this.Con_Attachments_Public= contractor.Con_Attachments_Public;
  this.Con_Attachments_W_9= contractor.Con_Attachments_W_9;
  this.Con_W_9= contractor.Con_W_9;
  this.Con_ICA= contractor.Con_ICA;
  this.Con_Q= contractor.Con_Q;
  this.Con_N= contractor.Con_N;
  this.Con_DD= contractor.Con_DD;
  this.Con_INS= contractor.Con_INS;
  this.Con_Agency_YesNo= contractor.Con_Agency_YesNo;
  this.Con_Referred_By= contractor.Con_Referred_By;
  this.Con_Afiliations= contractor.Con_Afiliations;
  this.Con_Cell_Phone2= contractor.Con_Cell_Phone2;
  this.Con_DBA_Name= contractor.Con_DBA_Name;
  this.Con_DBA_SSN= contractor.Con_DBA_SSN;
  this.Con_E_mail_Address_2= contractor.Con_E_mail_Address_2;
  this.Con_E_mail_Address_3= contractor.Con_E_mail_Address_3;
  this.Con_Field_Expertise= contractor.Con_Field_Expertise;
  this.Con_Expertise_Certifications= contractor.Con_Expertise_Certifications;
  this.Con_Initial= contractor.Con_Initial;
  this.Con_Interpreter_Status= contractor.Con_Interpreter_Status;
  this.Con_Mailing_Address= contractor.Con_Mailing_Address;
  this.Con_MDpto= contractor.Con_MDpto;
  this.Con_MA_City= contractor.Con_MA_City;
  this.Con_MA_State= contractor.Con_MA_State;
  this.Con_MA_County= contractor.Con_MA_County;
  this.Con_MA_Zip_Code= contractor.Con_MA_Zip_Code;
  this.Con_Payment_Method= contractor.Con_Payment_Method;
  this.Con_Paymethod_Check_name= contractor.Con_Paymethod_Check_name;
  this.Con_Paymethod_DirectDep_Bankname= contractor.Con_Paymethod_DirectDep_Bankname;
  this.Con_Paymethod_DirectDep_Routing= contractor.Con_Paymethod_DirectDep_Routing;
  this.Con_Paymethod_DirectDep_Account= contractor.Con_Paymethod_DirectDep_Account;
  this.Con_Paymethod_Paypal_Account= contractor.Con_Paymethod_Paypal_Account;
  this.Con_Paymethod_Zelle_Account= contractor.Con_Paymethod_Zelle_Account;
  this.Con_Terms= contractor.Con_Terms;
  this.Con_Payment_Decision= contractor.Con_Payment_Decision;
  this.Con_Physical_Address= contractor.Con_Physical_Address;
  this.Con_Dpto= contractor.Con_Dpto;
  this.Con_Other_Phone= contractor.Con_Other_Phone;
  this.Con_Title= contractor.Con_Title;
  this.Con_Title_Cert= contractor.Con_Title_Cert;
  this.Con_Services_Offered= contractor.Con_Services_Offered;
  this.Con_Rate_Depost= contractor.Con_Rate_Depost;
  this.Con_Referred_By_Name= contractor.Con_Referred_By_Name;
  this.Con_Referred_By_Other= contractor.Con_Referred_By_Other;
  this.Con_DBA_Country= contractor.Con_DBA_Country;
  this.Con_Office_Phone= contractor.Con_Office_Phone;
  this.Con_Training_Certifications= contractor.Con_Training_Certifications;
  this.Con_Badge_ID= contractor.Con_Badge_ID;
  this.Con_Work_Agency= contractor.Con_Work_Agency;
  this.Con_Agency_Currently_Working= contractor.Con_Agency_Currently_Working;
  this.person_id = contractor.person_id ;
};

Contractor.create = (newContractor, result) => {
  sql.query("INSERT INTO Contractors SET ?", newContractor, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Contractor: ", { id: res.insertId, ...newContractor });
    result(null, { id: res.insertId, ...newContractor });
  });
};

Contractor.findById = (id, result) => {
  sql.query(`SELECT * FROM contractors WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Contractor: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Contractor.getAll = (title, result) => {
  let query = "SELECT * FROM contractors";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Contractors: ", res);
    result(null, res);
  });
};

Contractor.getAllPublished = result => {
  sql.query("SELECT * FROM contractors", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Contractors: ", res);
    result(null, res);
  });
};

Contractor.updateById = (id,Contractor, result) => {
  sql.query(
    "UPDATE Contractors SET title = ?, description = ?, published = ? WHERE id = ?",
    [Contractor.id, id],
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

      console.log("updated Contractor: ", { id: id, ...contractor });
      result(null, { id: id, ...contractor });
    }
  );
};

Contractor.remove = (id, result) => {
  sql.query("DELETE FROM Contractors WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Contractor with id: ", id);
    result(null, res);
  });
};

Contractor.removeAll = result => {
  sql.query("DELETE FROM Contractors", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Contractors`);
    result(null, res);
  });
};

module.exports = Contractor;