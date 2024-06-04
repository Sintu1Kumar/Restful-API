const mysql = require("mysql2");
var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "employeedb",
});
mysqlConnection.connect((err) => {
  if (err) {
    console.log("Error in DB connection:" + JSON.stringify(err));
    err, undefined, 2;
  } else {
    console.log("Database Connected");
  }
});
module.exports = mysqlConnection;
