// Document is ready
$(document).ready(function () {
  console.log("welcome &*&*&*&*&");
  
  // Validate Username
  $("#first_name_check").hide();
  let usernameError = true;
  $("#fname").keyup(function () {
    validateUsername();
  });

  function validateUsername() {
    let fnameValue = $("#fname").val();
    let lnameValue = $("#lname").val();
    console.log("//////", fnameValue, lnameValue);
    if (fnameValue.length == "" && lnameValue.length == "") {
      $("#first_name_check").show();
      $("#last_name_check").show();
      usernameError = false;
      return false;
    } else {
      $("#first_name_check").hide();
      $("#last_name_check").hide();
    }
  }

  //validate city
  $("#City_check").hide();
  let cityError = true;
  $("#City").keyup(function () {
    validateCityname();
  });

  function validateCityname() {
    let City = $("#City").val();

    if (City.length == "") {
      $("#City_check").show();
      cityError = false;
      return false;
    } else {
      $("#City_check").hide();
    }
  }
  // phone number
  $("#phone_no_check").hide();
  // let phone_no = true;
  $("#phone_no").keyup(function () {
    validatePhoneNumber();
  });
  function validatePhoneNumber() {
    const phone = document.getElementById("#phone_no");
    var regex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    let s = phone.value;
    if (regex.test(s)) {
      phone.classList.remove("is-invalid");
      phoneError = true;
    } else {
      phone.classList.add("is-invalid");
      phoneError = false;
    }
  }

  // Validate Email
  const email = document.getElementById("email");
  email.addEventListener("blur", () => {
    let regex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
    let s = email.value;
    if (regex.test(s)) {
      email.classList.remove("is-invalid");
      emailError = true;
    } else {
      email.classList.add("is-invalid");
      emailError = false;
    }
  });

  // Validate Password
  $("#password_check").hide();
  let passwordError = true;
  $("#password").keyup(function () {
    validatePassword();
  });
  function validatePassword() {
    let passwordValue = $("#password").val();
    if (passwordValue.length == "") {
      $("#password_check").show();
      passwordError = false;
      return false;
    }
    if (passwordValue.length < 5 || passwordValue.length > 10) {
      $("#password_check").show();
      $("#password_check").html(
        "**length of your password must be between 5 and 10"
      );
      $("#password_check").css("color", "red");
      passwordError = false;
      return false;
    } else {
      $("#password_check").hide();
    }
  }

  // Submit button
  $("#submitbtn").click(function () {
    validateUsername();
    validatePassword();
    validateCityname();
    validatePhoneNumber;
    validateEmail();
    if (
      usernameError == true &&
      passwordError == true &&
      cityError == true &&
      emailError == true &&
      phoneError == true
    ) {
      return true;
    } else {
      return false;
    }
  });
});
