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
    conn.query("SELECT user_ID, user_email, user_password FROM user WHERE ? AND ?",
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
      "INSERT INTO user (user_fname, user_lname, user_email, user_password) VALUES (?,?,?,?)",
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

//Create new Journal Entry
app.post("/sendEntry", (req, res) => {
  const entry_title = req.body.entry_title;
  const entry_desc = req.body.entry_desc;
  const entry_date = req.body.entry_date;
  const user_ID = req.body.user_ID;

  conn.query(
    "INSERT INTO journal (entry_title, entry_desc, entry_date, user_ID) VALUES (?,?,?,?)",
    [entry_title, entry_desc, entry_date, user_ID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(req.body);
      }
    }
  )
});

//Get Journal Entries
app.get('/getEntries', (req, res) => {

  const user_ID = req.query.user_ID; 
  conn.query("SELECT entry_ID, entry_title, entry_desc, DATE_FORMAT(entry_date, '%d %M %Y') AS entry_date, user_ID FROM journal WHERE ?",
  [user_ID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


//Opens port for node server
app.listen(19007, () => {
console.log(`Node server listening`)
})