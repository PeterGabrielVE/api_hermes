module.exports = app => {
    const employees = require("../controllers/employee.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", employees.create);
  
    router.get("/getAll", employees.findAll);
  
    router.get("/published", employees.findAllPublished);
  
    router.get("/:id", employees.findOne);
  
    router.put("/:id", employees.update);
  
    router.delete("/:id", employees.delete);
  
    router.delete("/", employees.deleteAll);
  
    app.use('/api/employees', router);
  };
  