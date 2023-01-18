require('dotenv').config();
const express = require('express')
const mysql = require('mysql2')
const app = express()
const cors = require("cors");
app.use(cors());
app.use(express.json());

const conn = mysql.createConnection(process.env.DATABASE_URL);
conn.connect(function(err) {
    if (err) throw err;
    console.log("Succesfully connected to PlanetScale!"); //Just to see valid connection
});

// Login user
app.get('/login', (req, res) => {

    const email = req.query.user_email; 
    const password = req.query.user_password;
    conn.query("SELECT email, password FROM user WHERE ? AND ?",
    [email, password], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

  // Register user
app.post("/register", (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;
  
    conn.query(
      "INSERT INTO user (fname, lname, email, password) VALUES (?,?,?,?)",
      [fname, lname, email, password],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.json(req.body);
        }
      }
    );
});

// Test
app.get('/fruits', (req, res) => {
    conn.query("SELECT `item_img` AS img, `item_name` AS Name  FROM `item` WHERE category_id = 1;",(err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    });
  })

//Opens port for node server
app.listen(19007, () => {
console.log(`Node server listening`)
})