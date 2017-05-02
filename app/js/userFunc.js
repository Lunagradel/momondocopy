$(document).ready(function () {
  loginChangeMarkup();
});


function loginChangeMarkup() {
  if (localStorage.getItem("isLoggedIn") == "true") {
    var sUserDetails = "<button class='btnUser regular-button'>Account</button>"
    $(".btnLogin").html("Logout");
    $(".login").append(sUserDetails);
  }else {

    $(".btnLogin").html("Login");
    $(".btnUser").remove();
  }
}


// SHOW HIDE IN

$(".btnRegister").click(function () {
  $("#register").toggleClass("hidden");
  if (!$("#LoginContainer").hasClass("hidden")) {
    $("#LoginContainer").toggleClass("hidden");
  }
});

$(".btnLogin").click(function () {
  if (localStorage.getItem("isLoggedIn") == "true") {
    localStorage.setItem("isLoggedIn", false);
    loginChangeMarkup();
    swal({
      title: "Logout!",
      text: "User has successfully been logged out",
      timer: 1500,
      showConfirmButton: false
    });
  }else {
    $("#LoginContainer").toggleClass("hidden");
    if (!$("#register").hasClass("hidden")) {
      $("#register").toggleClass("hidden");
    }
  }
});

// SHOW HIDE OUT


$("#submit").click(function () {
  var sFirstName = $("input[name='firstName']").val(),
  sLastname = $("input[name='lastName']").val(),
  sMail = $("input[name='mail']").val(),
  sPassword = $("input[name='Password']").val(),
  sBday = $("input[name='Bday']").val(),
  sGender = $(".gender").find("input:checked").val(),
  sPassport = $("input[name='Passport']").val(),
  sPhone = $("input[name='Phone']").val(),
  sCompany = $("input[name='Company']").val(),
  nCardNr = $("input[name='cardNr']").val(),
  nExMnth = $("input[name='exMnth']").val(),
  nExYear = $("input[name='exYear']").val(),
  sCardHolder = $("input[name='cardHolder']").val();

  var userjson =  {"user": {
                      "credentials": {
                        "firstName": sFirstName,
                        "lastName": sLastname,
                        "email": sMail,
                        "password": sPassword,
                        "bday": sBday,
                        "title": sGender,
                        "PassNr": sPassport,
                        "phone": sPhone,
                        "CompanyName": sCompany,
                        "creditCard": {
                          "cardNr": nCardNr,
                          "exMnth": nExMnth,
                          "exYear": nExYear,
                          "cardHolder": sCardHolder
                          }
                         }
                        }
                      }

  // var data = JSON.stringify( $(".register").serializeArray());
  var data = JSON.stringify(userjson);

  console.log(data);

  localStorage.setItem("user", data);

  swal("User successfully registered", "Please login to use the service", "success");

  if (!$("#register").hasClass("hidden")) {
    $("#register").toggleClass("hidden");
  }


})
$("#login").click(function () {
  var formData = $.parseJSON(localStorage.user),
      mail = formData.user.credentials.email,
      pass = formData.user.credentials.password,
      inputMail = $("input[name='loginMail']").val(),
      inputPass = $("input[name='loginPass']").val();


  if ((inputMail == mail) && (inputPass == pass)) {
    console.log("ITS A MIRCALE");
    swal("Success", "You've been logged in!", "success")
    if (!$("#LoginContainer").hasClass("hidden")) {
      $("#LoginContainer").toggleClass("hidden");
    }
    localStorage.setItem("isLoggedIn", "true");
    loginChangeMarkup();

  }else {
    sweetAlert("Login failed", "Password and username did not match", "error");
    console.log(inputMail+" and stored "+mail);
    console.log(inputPass+" and stored "+pass);
  }
})
