const connection = require("./connection");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

// Get Request
app.get("/employees", (req, res) => {
  connection.query("select * from employee", (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      //   console.log(rows);
      res.send(rows);
    }
  });
});

// Get Request by id
app.get("/employees/:id", (req, res) => {
  connection.query(
    "select * from employee where id=?",
    [req.params.id],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        //   console.log(rows);
        res.send(rows);
      }
    }
  );
});

// Delete Request
app.delete("/employees/:id", (req, res) => {
  connection.query(
    "delete from employee where id=?",
    [req.params.id],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        //   console.log(rows);
        res.send(rows);
      }
    }
  );
});

// Post Request
app.post("/employees", (req, res) => {
  const emp = req.body;
  const empData = [emp.name, emp.salary];
  connection.query(
    "insert into employee(name,salary)values(?)",
    [empData],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        //   console.log(rows);
        res.send(rows);
      }
    }
  );
});

// Patch Request
app.patch("/employees", (req, res) => {
  const emp = req.body;
  connection.query(
    "update employee set ? where id =" + emp.id,
    [emp],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        //   console.log(rows);
        res.send(rows);
      }
    }
  );
});

// Put Request
app.put("/employees", (req, res) => {
  const emp = req.body;
  connection.query(
    "update employee set ? where id =" + emp.id,
    [emp],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        //   console.log(rows);
        if (rows.affectedRows == 0) {
          const empData = [emp.name, emp.salary];
          connection.query(
            "insert into employee(name,salary)values(?)",
            [empData],
            (err, rows) => {
              if (err) {
                console.log(err);
              } else {
                //   console.log(rows);
                res.send(rows);
              }
            }
          );
        } else {
          res.send(rows);
        }
      }
    }
  );
});
app.listen(3000, () => console.log("Express Server is running on port 3000"));
