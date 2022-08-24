const Contractor = require("../models/contractor.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const contractor = new Contractor({
    Con_Suffix: req.body.Con_Suffix,
    Con_First_Name : req.body.Con_First_Name ,
    Con_Last_Name: req.body.Con_Last_Name,
    Con_Middle_Name : req.body.Con_Middle_Name ,
    Con_Agency_Name: req.body.Con_Agency_Name,
    Con_DBA: req.body.Con_DBA,
    Con_Street_Address_1: req.body.Con_Street_Address_1,
    Con_Street_Address_2: req.body.Con_Street_Address_2,
    Con_City: req.body.Con_City,
    Con_State: req.body.Con_State,
    Con_Zip: req.body.Con_Zip,
    Con_County: req.body.Con_County,
    Con_Home_Phone: req.body.Con_Home_Phone,
    Con_Fax_Phone: req.body.Con_Fax_Phone,
    Con_Cell_Phone: req.body.Con_Cell_Phone,
    Con_E_mail_Address: req.body.Con_E_mail_Address,
    Con_Website: req.body.Con_Website,
    Con_Skype: req.body.Con_Skype,
    Con_Linkedin: req.body.Con_Linkedin,
    Con_Proz: req.body.Con_Proz,
    Con_TaxID: req.body.Con_TaxID,
    Con_Birthdate: req.body.Con_Birthdate,
    Con_Sex: req.body.Con_Sex,
    Con_Language_1: req.body.Con_Language_1,
    Con_Notes : req.body.Con_Notes ,
    Con_Availability_Monday: req.body.Con_Availability_Monday,
    Con_Avaiability_Monday_Start: req.body.Con_Avaiability_Monday_Start,
    Con_Avaiability_Monday_End: req.body.Con_Avaiability_Monday_End,
    Con_Availability_Tuesday: req.body.Con_Availability_Tuesday,
    Con_Avaiability_Tuesday_Start: req.body.Con_Avaiability_Tuesday_Start,
    Con_Avaiability_Tuesday_End: req.body.Con_Avaiability_Tuesday_End,
    Con_Availability_Wednesday: req.body.Con_Availability_Wednesday,
    Con_Avaiability_Wednesday_Start: req.body.Con_Avaiability_Wednesday_Start,
    Con_Avaiability_Webnesday_End: req.body.Con_Avaiability_Webnesday_End,
    Con_Availability_Thursday: req.body.Con_Availability_Thursday,
    Con_Avaiability_Thursday_Start: req.body.Con_Avaiability_Thursday_Start,
    Con_Avaiability_Thursday_End: req.body.Con_Avaiability_Thursday_End,
    Con_Availability_Friday: req.body.Con_Availability_Friday,
    Con_Avaiability_Friday_Start: req.body.Con_Avaiability_Friday_Start,
    Con_Avaiability_Friday_End: req.body.Con_Avaiability_Friday_End,
    Con_Availability_Saturday: req.body.Con_Availability_Saturday,
    Con_Avaiability_Saturday_Start: req.body.Con_Avaiability_Saturday_Start,
    Con_Avaiability_Saturday_End: req.body.Con_Avaiability_Saturday_End,
    Con_Availability_Sunday: req.body.Con_Availability_Sunday,
    Con_Avaiability_Sunday_Start: req.body.Con_Avaiability_Sunday_Start,
    Con_Avaiability_Sunday_End: req.body.Con_Avaiability_Sunday_End,
    Con_Education_Degree: req.body.Con_Education_Degree,
    Con_Yearsschool: req.body.Con_Yearsschool,
    Con_Additional_Info : req.body.Con_Additional_Info ,
    Con_Attachments: req.body.Con_Attachments,
    Con_Attachments_Public: req.body.Con_Attachments_Public,
    Con_Attachments_W_9: req.body.Con_Attachments_W_9,
    Con_W_9: req.body.Con_W_9,
    Con_ICA: req.body.Con_ICA,
    Con_Q: req.body.Con_Q,
    Con_N: req.body.Con_N,
    Con_DD: req.body.Con_DD,
    Con_INS: req.body.Con_INS,
    Con_Agency_YesNo: req.body.Con_Agency_YesNo,
    Con_Referred_By: req.body.Con_Referred_By,
    Con_Afiliations: req.body.Con_Afiliations,
    Con_Cell_Phone2: req.body.Con_Cell_Phone2,
    Con_DBA_Name: req.body.Con_DBA_Name,
    Con_DBA_SSN: req.body.Con_DBA_SSN,
    Con_E_mail_Address_2: req.body.Con_E_mail_Address_2,
    Con_E_mail_Address_3: req.body.Con_E_mail_Address_3,
    Con_Field_Expertise: req.body.Con_Field_Expertise,
    Con_Expertise_Certifications: req.body.Con_Expertise_Certifications,
    Con_Initial: req.body.Con_Initial,
    Con_Interpreter_Status: req.body.Con_Interpreter_Status,
    Con_Mailing_Address: req.body.Con_Mailing_Address,
    Con_MDpto: req.body.Con_MDpto,
    Con_MA_City: req.body.Con_MA_City,
    Con_MA_State: req.body.Con_MA_State,
    Con_MA_County: req.body.Con_MA_County,
    Con_MA_Zip_Code: req.body.Con_MA_Zip_Code,
    Con_Payment_Method: req.body.Con_Payment_Method,
    Con_Paymethod_Check_name: req.body.Con_Paymethod_Check_name,
    Con_Paymethod_DirectDep_Bankname: req.body.Con_Paymethod_DirectDep_Bankname,
    Con_Paymethod_DirectDep_Routing: req.body.Con_Paymethod_DirectDep_Routing,
    Con_Paymethod_DirectDep_Account: req.body.Con_Paymethod_DirectDep_Account,
    Con_Paymethod_Paypal_Account: req.body.Con_Paymethod_Paypal_Account,
    Con_Paymethod_Zelle_Account: req.body.Con_Paymethod_Zelle_Account,
    Con_Terms: req.body.Con_Terms,
    Con_Payment_Decision: req.body.Con_Payment_Decision,
    Con_Physical_Address: req.body.Con_Physical_Address,
    Con_Dpto: req.body.Con_Dpto,
    Con_Other_Phone: req.body.Con_Other_Phone,
    Con_Title: req.body.Con_Title,
    Con_Title_Cert: req.body.Con_Title_Cert,
    Con_Services_Offered: req.body.Con_Services_Offered,
    Con_Rate_Depost: req.body.Con_Rate_Depost,
    Con_Referred_By_Name: req.body.Con_Referred_By_Name,
    Con_Referred_By_Other: req.body.Con_Referred_By_Other,
    Con_DBA_Country: req.body.Con_DBA_Country,
    Con_Office_Phone: req.body.Con_Office_Phone,
    Con_Training_Certifications: req.body.Con_Training_Certifications,
    Con_Badge_ID: req.body.Con_Badge_ID,
    Con_Work_Agency: req.body.Con_Work_Agency,
    Con_Agency_Currently_Working: req.body.Con_Agency_Currently_Working,
    person_id : req.body.person_id ,
  });

  Contractor.create(contractor, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Contractor."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Contractor.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Contractors."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    Contractor.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Contractor with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Contractor with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
    Contractor.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Contractors."
      });
    else res.send(data);
  });
};

exports.update = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Contractor.updateById(
    req.params.id,
    new Contractor(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Contractor with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Contractor with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Contractor.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Contractor with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Contractor with id " + req.params.id
        });
      }
    } else res.send({ message: `Contractor was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Contractor.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Contractors."
      });
    else res.send({ message: `All Contractors were deleted successfully!` });
  });
};
