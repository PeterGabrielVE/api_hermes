const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8085"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/agencies.routes.js")(app);
require("./app/routes/assignments.routes.js")(app);
require("./app/routes/assignments_status.routes.js")(app);
require("./app/routes/bills.routes.js")(app);
require("./app/routes/bill_payments.routes.js")(app);
require("./app/routes/certifications.routes.js")(app);
require("./app/routes/chat_messages.routes.js")(app);
require("./app/routes/chat_rooms.routes.js")(app);
require("./app/routes/contacts_customer.routes.js")(app);
require("./app/routes/contractors.routes.js")(app);
require("./app/routes/customers.routes.js")(app);
require("./app/routes/customer_service_states.routes.js")(app);
require("./app/routes/emails.routes.js")(app);
require("./app/routes/email_customers.routes.js")(app);
require("./app/routes/employees.routes.js")(app);
require("./app/routes/estimate_quote.routes.js")(app);
require("./app/routes/expertise_interpreters.routes.js")(app);
require("./app/routes/history_logs.routes.js")(app);
require("./app/routes/intepreters_contacts.routes.js")(app);
require("./app/routes/interpreters.routes.js")(app);
require("./app/routes/interpreters_dbas.routes.js")(app);
require("./app/routes/interpreters_network.routes.js")(app);
require("./app/routes/interpreter_afiliations.routes.js")(app);
require("./app/routes/interpreter_certifications.routes.js")(app);
require("./app/routes/interpreter_certification_states.routes.js")(app);
require("./app/routes/interpreter_training.routes.js")(app);
require("./app/routes/invoices.routes.js")(app);
require("./app/routes/invoices_outcomes.routes.js")(app);
require("./app/routes/jobs.routes.js")(app);
require("./app/routes/job_orders.routes.js")(app);
require("./app/routes/job_orders_status.routes.js")(app);
require("./app/routes/languages.routes.js")(app);
require("./app/routes/language_service_offereds.routes.js")(app);
require("./app/routes/model_has_permissions.routes.js")(app);
require("./app/routes/model_has_roles.routes.js")(app);
require("./app/routes/notes_interpreters.routes.js")(app);
require("./app/routes/outcome_assign_interpreters.routes.js")(app);
require("./app/routes/outcome_interpreters.routes.js")(app);
require("./app/routes/password_resets.routes.js")(app);
require("./app/routes/people.routes.js")(app);
require("./app/routes/permissions.routes.js")(app);
require("./app/routes/phones.routes.js")(app);
require("./app/routes/qualification.routes.js")(app);
require("./app/routes/receive_assignment.routes.js")(app);
require("./app/routes/receive_payments.routes.js")(app);
require("./app/routes/receive_payment_invoice.routes.js")(app);
require("./app/routes/request_customers.routes.js")(app);
require("./app/routes/roles.routes.js")(app);
require("./app/routes/role_user.routes.js")(app);
require("./app/routes/services.routes.js")(app);
require("./app/routes/services_new.routes.js")(app);
require("./app/routes/services_rates_types.routes.js")(app);
require("./app/routes/services_requests.routes.js")(app);
require("./app/routes/services_requests_status.routes.js")(app);
require("./app/routes/services_types.routes.js")(app);
require("./app/routes/service_estimate_job.routes.js")(app);
require("./app/routes/service_offereds.routes.js")(app);
require("./app/routes/service_request_field.routes.js")(app);
require("./app/routes/states.routes.js")(app);
require("./app/routes/type_emails.routes.js")(app);
require("./app/routes/type_phones.routes.js")(app);
require("./app/routes/users.routes.js")(app);
require("./app/routes/zip_codes.routes.js")(app);

//require("./app/routes/tutorial.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8886;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
