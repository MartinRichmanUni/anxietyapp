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
    // Displays connection has been established
    console.log("Succesfully connected to PlanetScale!"); 
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

// Create new Journal Entry
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


// Get Journal Entries
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

// Get User's Goals
app.get('/getGoals', (req,res) => {
  const user_ID = req.query.user_ID; 
  conn.query("SELECT goal.goal_ID, goal.goal_title, step.step_ID, step.step_desc FROM goal INNER JOIN step ON goal.goal_ID = step.goal_ID",
  [user_ID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

// Add new Supporter
app.post("/sendSupporter", (req, res) => {
  const supporter_fname = req.body.supporter_fname;
  const relationship_ID = req.body.relationship_ID;
  const user_ID = req.body.user_ID;

  conn.query(
    "INSERT INTO supporter (supporter_fname, relationship_ID, user_ID) VALUES (?,?,?)",
    [supporter_fname, relationship_ID, user_ID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(req.body);
      }
    }
  )
});

// Get User's Supporters
app.get("/getSupporters", (req, res) => {
  const user_ID = req.query.user_ID; 
  conn.query("SELECT supporter_ID, supporter_fname, relationship_ID FROM supporter WHERE ?",
  [user_ID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
})

// Get All Relationships
app.get('/getRelationships', (req,res) => {
  conn.query("SELECT relationship_ID, relationship_title FROM relationship",
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

// Get All Moods
app.get('/getMoods', (req,res) => {
  conn.query("SELECT mood_ID, mood_title FROM mood",
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

// Send User Created Mood
app.post("/sendMood", (req, res) => {
  const tracker_date = req.body.tracker_date;
  const tracker_time = req.body.tracker_time;
  const tracker_influence = req.body.tracker_influence;
  const mood_ID = req.body.mood_ID;
  const user_ID = req.body.user_ID;

  conn.query(
    "INSERT INTO moodTracker (tracker_date, tracker_time, tracker_influence, mood_ID, user_ID) VALUES (?,?,?,?,?)",
    [tracker_date, tracker_time, tracker_influence, mood_ID, user_ID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(req.body);
      }
    }
  )
});

// Get User Details
app.get('/getUser', (req,res) => {
  const user_ID = req.query.user_ID; 
  conn.query("SELECT user_ID, user_fname, user_lname, user_email FROM user WHERE ?",
  [user_ID], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
  });
});

// Get User Password
app.get('/getPassword', (req,res) => {
  const user_ID = req.query.user_ID;
  const user_password = req.query.user_password;

  conn.query("SELECT user_password FROM user WHERE ? AND ?",
  [user_ID, user_password], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
  });
});

// Update User Password
app.post('/changePassword', (req,res) => {
  const newPass = req.body.newPass;
  const user_ID = req.body.user_ID;

  conn.query(
    "UPDATE user SET user_password = ? WHERE user_ID = ?",
    [newPass, user_ID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(req.body);
      }
    }
  )
});

// Opens port for node server
app.listen(19007, () => {
console.log(`Node server listening`)
})