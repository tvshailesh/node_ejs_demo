var express = require("express");
var router = express.Router();
var connection = require("../connection/db");

router.get("/", (req, res) => {
  // res.send({ message: `API Working` })
  res.render("signup.ejs");
});

//display login page
router.get("/login", function (req, res, next) {
  // render to views/user/add.ejs
  res.render("login", {
    title: "Login",
    email: "",
    password: "",
  });
});

// register
router.post("/formFillUp", (req, res) => {
  const { first_name, last_name, age, city, phone_no, email, password } =
    req.body;
  // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');

  let query = connection.query(
    "INSERT INTO users SET?",
    {
      first_name: first_name,
      last_name: last_name,
      age: age,
      city: city,
      phone_no: phone_no,
      email: email,
      password: password,
    },
    (err, rows) => {
      if (err) throw err;
      res.render("formsubmit", {
        title: "Form Submitted",
      });
    }
  );
});

//login
router.post("/authentication", (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;
  // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
  let sql = "SELECT * FROM users";
  let query = connection.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, rows) => {
      if (err) throw err;
      if (rows.length <= 0) {
        req.flash("error", "Please correct enter email and Password!");
        res.redirect("/login");
      } else {
        res.render("Dashboard", {
          title: "Welcome To Dashboard",
          users: rows,
        });
      }
    }
  );
});

//display home page
router.get("/Dashboard", (req, res) => {
  // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
  let sql = "SELECT * FROM users";
  let query = connection.query(sql, (err, rows) => {
    if (err) throw err;
    res.render("Dashboard", {
      title: "Admin Dashboard",
      users: rows,
    });
  });
});

// Logout user
// router.get("/logout", function (req, res) {
//   req.session.destroy();
//   req.flash("success", "Login Again Here");
//   res.redirect("/login");
// });

module.exports = router;
