const sql = require("./db.js");
const Contractor = function(Contractor) {
  
  this.Con_Suffix= Contractor.Con_Suffix;
  this.Con_First_Name = Contractor.Con_First_Name;
  this.Con_Last_Name= Contractor.Con_Last_Name;
  this.Con_Middle_Name = Contractor.Con_Middle_Name;
  this.Con_Agency_Name= Contractor.Con_Agency_Name;
  this.Con_DBA= Contractor.Con_DBA;
  this.Con_Street_Address_1= Contractor.Con_Street_Address_1;
  this.Con_Street_Address_2= Contractor.Con_Street_Address_2;
  this.Con_City= Contractor.Con_City;
  this.Con_State= Contractor.Con_State;
  this.Con_Zip= Contractor.Con_Zip;
  this.Con_County= Contractor.Con_County;
  this.Con_Home_Phone= Contractor.Con_Home_Phone;
  this.Con_Fax_Phone= Contractor.Con_Fax_Phone;
  this.Con_Cell_Phone= Contractor.Con_Cell_Phone;
  this.Con_E_mail_Address= Contractor.Con_E_mail_Address;
  this.Con_Website= Contractor.Con_Website;
  this.Con_Skype= Contractor.Con_Skype;
  this.Con_Linkedin= Contractor.Con_Linkedin;
  this.Con_Proz= Contractor.Con_Proz;
  this.Con_TaxID= Contractor.Con_TaxID;
  this.Con_Birthdate = Contractor.Con_Birthdate;
  this.Con_Sex= Contractor.Con_Sex;
  this.Con_Language_1= Contractor.Con_Language_1;
  this.Con_Notes = Contractor.Con_Notes ;
  this.Con_Availability_Monday= Contractor.Con_Availability_Monday;
  this.Con_Avaiability_Monday_Start= Contractor.Con_Avaiability_Monday_Start;
  this.Con_Avaiability_Monday_End= Contractor.Con_Avaiability_Monday_End;
  this.Con_Availability_Tuesday= Contractor.Con_Availability_Tuesday;
  this.Con_Avaiability_Tuesday_Start= Contractor.Con_Avaiability_Tuesday_Start;
  this.Con_Avaiability_Tuesday_End= Contractor.Con_Avaiability_Tuesday_End;
  this.Con_Availability_Wednesday= Contractor.Con_Availability_Wednesday;
  this.Con_Avaiability_Wednesday_Start= Contractor.Con_Avaiability_Wednesday_Start;
  this.Con_Avaiability_Webnesday_End= Contractor.Con_Avaiability_Webnesday_End;
  this.Con_Availability_Thursday= Contractor.Con_Availability_Thursday;
  this.Con_Avaiability_Thursday_Start= Contractor.Con_Avaiability_Thursday_Start;
  this.Con_Avaiability_Thursday_End= Contractor.Con_Avaiability_Thursday_End;
  this.Con_Availability_Friday= Contractor.Con_Availability_Friday;
  this.Con_Avaiability_Friday_Start= Contractor.Con_Avaiability_Friday_Start;
  this.Con_Avaiability_Friday_End= Contractor.Con_Avaiability_Friday_End;
  this.Con_Availability_Saturday= Contractor.Con_Availability_Saturday;
  this.Con_Avaiability_Saturday_Start= Contractor.Con_Avaiability_Saturday_Start;
  this.Con_Avaiability_Saturday_End= Contractor.Con_Avaiability_Saturday_End;
  this.Con_Availability_Sunday= Contractor.Con_Availability_Sunday;
  this.Con_Avaiability_Sunday_Start= Contractor.Con_Avaiability_Sunday_Start;
  this.Con_Avaiability_Sunday_End= Contractor.Con_Avaiability_Sunday_End;
  this.Con_Education_Degree= Contractor.Con_Education_Degree;
  this.Con_Yearsschool= Contractor.Con_Yearsschool;
  this.Con_Additional_Info = Contractor.Con_Additional_Info;
  this.Con_Attachments= Contractor.Con_Attachments;
  this.Con_Attachments_Public= Contractor.Con_Attachments_Public;
  this.Con_Attachments_W_9= Contractor.Con_Attachments_W_9;
  this.Con_W_9= Contractor.Con_W_9;
  this.Con_ICA= Contractor.Con_ICA;
  this.Con_Q= Contractor.Con_Q;
  this.Con_N= Contractor.Con_N;
  this.Con_DD= Contractor.Con_DD;
  this.Con_INS= Contractor.Con_INS;
  this.Con_Agency_YesNo= Contractor.Con_Agency_YesNo;
  this.Con_Referred_By= Contractor.Con_Referred_By;
  this.Con_Afiliations= Contractor.Con_Afiliations;
  this.Con_Cell_Phone2= Contractor.Con_Cell_Phone2;
  this.Con_DBA_Name= Contractor.Con_DBA_Name;
  this.Con_DBA_SSN= Contractor.Con_DBA_SSN;
  this.Con_E_mail_Address_2= Contractor.Con_E_mail_Address_2;
  this.Con_E_mail_Address_3= Contractor.Con_E_mail_Address_3;
  this.Con_Field_Expertise= Contractor.Con_Field_Expertise;
  this.Con_Expertise_Certifications= Contractor.Con_Expertise_Certifications;
  this.Con_Initial= Contractor.Con_Initial;
  this.Con_Interpreter_Status= Contractor.Con_Interpreter_Status;
  this.Con_Mailing_Address= Contractor.Con_Mailing_Address;
  this.Con_MDpto= Contractor.Con_MDpto;
  this.Con_MA_City= Contractor.Con_MA_City;
  this.Con_MA_State= Contractor.Con_MA_State;
  this.Con_MA_County= Contractor.Con_MA_County;
  this.Con_MA_Zip_Code= Contractor.Con_MA_Zip_Code;
  this.Con_Payment_Method= Contractor.Con_Payment_Method;
  this.Con_Paymethod_Check_name= Contractor.Con_Paymethod_Check_name;
  this.Con_Paymethod_DirectDep_Bankname= Contractor.Con_Paymethod_DirectDep_Bankname;
  this.Con_Paymethod_DirectDep_Routing= Contractor.Con_Paymethod_DirectDep_Routing;
  this.Con_Paymethod_DirectDep_Account= Contractor.Con_Paymethod_DirectDep_Account;
  this.Con_Paymethod_Paypal_Account= Contractor.Con_Paymethod_Paypal_Account;
  this.Con_Paymethod_Zelle_Account= Contractor.Con_Paymethod_Zelle_Account;
  this.Con_Terms= Contractor.Con_Terms;
  this.Con_Payment_Decision= Contractor.Con_Payment_Decision;
  this.Con_Physical_Address= Contractor.Con_Physical_Address;
  this.Con_Dpto= Contractor.Con_Dpto;
  this.Con_Other_Phone= Contractor.Con_Other_Phone;
  this.Con_Title= Contractor.Con_Title;
  this.Con_Title_Cert= Contractor.Con_Title_Cert;
  this.Con_Services_Offered= Contractor.Con_Services_Offered;
  this.Con_Rate_Depost= Contractor.Con_Rate_Depost;
  this.Con_Referred_By_Name= Contractor.Con_Referred_By_Name;
  this.Con_Referred_By_Other= Contractor.Con_Referred_By_Other;
  this.Con_DBA_Country= Contractor.Con_DBA_Country;
  this.Con_Office_Phone= Contractor.Con_Office_Phone;
  this.Con_Training_Certifications= Contractor.Con_Training_Certifications;
  this.Con_Badge_ID= Contractor.Con_Badge_ID;
  this.Con_Work_Agency= Contractor.Con_Work_Agency;
  this.Con_Agency_Currently_Working= Contractor.Con_Agency_Currently_Working;
  this.person_id = Contractor.person_id;
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
  sql.query(`SELECT * FROM Contractors WHERE id = ${id}`, (err, res) => {
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
  let query = "SELECT * FROM Contractors";

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
  sql.query("SELECT * FROM Contractors", (err, res) => {
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

      console.log("updated Contractor: ", { id: id, ...Contractor });
      result(null, { id: id, ...Contractor });
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