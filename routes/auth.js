var express = require("express");
var router = express.Router();
var connection = require("../connection/db");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const { check, validationResult } = require("express-validator/check");

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
router.post(
  "/formFillUp",
  // urlencodedParser,
  // [
  //   check("email", "Email length should be 10 to 30 characters")
  //     .isEmail()
  //     .isLength({ min: 10, max: 30 }),
  //   check("phone_no", "Mobile number should contains 10 digits").isLength({
  //     min: 10,
  //     max: 10,
  //   }),
  //   check("password", "Password length should be 5 to 10 characters").isLength({
  //     min: 5,
  //     max: 10,
  //   }),
  // ],
  (req, res, next) => {
    const { first_name, last_name, age, city, phone_no, email, password } =
      req.body;
    // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(422).jsonp(errors.array())
      // const alert = errors.array()
      // console.log("~~~~~~",alert)
      res.render("signup");
    } else {
      // let query = connection.query(
      //   "INSERT INTO users SET?",
      //   {
      //     first_name: first_name,
      //     last_name: last_name,
      //     age: age,
      //     city: city,
      //     phone_no: phone_no,
      //     email: email,
      //     password: password,
      //   },
      //   (err, rows) => {
      //     if (err) {
      //       // res.render('signup')
      //       console.log("No error");
      //       throw err;
      //     } else {
      //       console.log("No error");
      //       res.render("formsubmit", {
      //         title: "Form Submitted",
      //       });
      //     }
      //   }
      // );
      
    }
  }
);

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
