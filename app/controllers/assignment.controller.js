const 	Assignment = require("../models/assignment.model.js");

// Create and Save a new 
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a 
  const assignment = new Assignment({
    jobs_id : req.body.jobs_id,
    Jobs_Status : req.body.Jobs_Status,
    contractors_id : req.body.contractors_id,
    contractors_First_Name : req.body.contractors_First_Name,
    contractors_Last_Name : req.body.contractors_Last_Name,
    contractors_Con_Agency_Name : req.body.contractors_Con_Agency_Name,
    contractors_Home_Phone : req.body.contractors_Home_Phone ,
    contractors_Cell_Phone : req.body.contractors_Cell_Phone ,
    contractors_Email : req.body.contractors_Email ,
    os_ph : req.body.os_ph ,
    os_minimum : req.body.os_minimum ,
    os_subtotal : req.body.os_subtotal ,
    os_permile : req.body.os_permile ,
    os_dist : req.body.os_dist ,
    os_distmile : req.body.os_distmile ,
    os_total : req.body.os_total ,
    tv_ph : req.body.tv_ph ,
    tv_mph : req.body.tv_mph ,
    tv_totalph : req.body.tv_totalph ,
    tv_pm : req.body.tv_pm ,
    tv_mpm : req.body.tv_mpm ,
    tv_totalpm : req.body.tv_totalpm ,
    check_vt_ph : req.body.check_vt_ph ,
    check_vt_pm : req.body.check_vt_pm ,
    t_pw : req.body.t_pw ,
    t_words : req.body.t_words ,
    t_totalpw : req.body.t_totalpw ,
    t_pp : req.body.t_pp ,
    t_pages : req.body.t_pages ,
    t_totalpp : req.body.t_totalpp ,
    t_ph : req.body.t_ph ,
    t_mph : req.body.t_mph ,
    t_totalph : req.body.t_totalph ,
    t_ppt : req.body.t_ppt ,
    check_t_pw : req.body.check_t_pw ,
    check_t_pp : req.body.check_t_pp ,
    check_t_ph : req.body.check_t_ph ,
    check_t_ppt : req.body.check_t_ppt ,
    int_cancelation : req.body.int_cancelation ,
    int_no_show : req.body.int_no_show ,
    int_travel_time_hours : req.body.int_travel_time_hours ,
    int_travel_time_rate : req.body.int_travel_time_rate ,
    int_total_travel_time : req.body.int_total_travel_time ,
    int_total : req.body.int_total ,
    int_parking_tolls : req.body.int_parking_tolls ,
    tp_ph : req.body.tp_ph ,
    tp_mph : req.body.tp_mph ,
    tp_totalph : req.body.tp_totalph ,
    tp_permileh : req.body.tp_permileh ,
    tp_disth : req.body.tp_disth ,
    tp_distmileh : req.body.tp_distmileh ,
    tp_totalmilehour : req.body.tp_totalmilehour ,
    tp_pm : req.body.tp_pm ,
    tp_mpm : req.body.tp_mpm ,
    tp_totalpm : req.body.tp_totalpm ,
    tp_permilem : req.body.tp_permilem ,
    tp_distm : req.body.tp_distm ,
    tp_distmilem : req.body.tp_distmilem ,
    tp_totalmileminute : req.body.tp_totalmileminute ,
    check_tp_ph : req.body.check_tp_ph ,
    check_tp_pm : req.body.check_tp_pm ,
    trin_ph : req.body.trin_ph ,
    trin_mph : req.body.trin_mph ,
    trin_totalph : req.body.trin_totalph ,
    trin_pd : req.body.trin_pd ,
    trin_mpd : req.body.trin_mpd ,
    trin_totalpd : req.body.trin_totalpd ,
    trin_pc : req.body.trin_pc ,
    trin_mpc : req.body.trin_mpc ,
    trin_totalpc : req.body.trin_totalpc ,
    check_trin_ph : req.body.check_trin_ph ,
    check_trin_pd : req.body.check_trin_pd ,
    check_trin_pc : req.body.check_trin_pc ,
    attachment_int : req.body.attachment_int ,

  });

  // Save Invoice in the database
  Assignment.create(assignment, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Assignment."
      });
    else res.send(data);
  });
};

// Retrieve all  from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Assignment.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving 	Assignments."
      });
    else res.send(data);
  });
};

// Find a single  by Id
exports.findOne = (req, res) => {
    Assignment.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Assignment with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Assignment with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Invoices
exports.findAllPublished = (req, res) => {
    Assignment.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving 	Assignments."
      });
    else res.send(data);
  });
};

// Update a  identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Assignment.updateById(
    req.params.id,
    new Assignment(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Assignment with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Assignment with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a  with the specified id in the request
exports.delete = (req, res) => {
    Assignment.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Assignment with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Assignment with id " + req.params.id
        });
      }
    } else res.send({ message: `Assignment was deleted successfully!` });
  });
};

// Delete all  from the database.
exports.deleteAll = (req, res) => {
Assignment.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Assignments."
      });
    else res.send({ message: `All Assignments were deleted successfully!` });
  });
};
