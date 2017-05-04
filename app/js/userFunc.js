$(document).ready(function () {
  loginChangeMarkup();
});

$(".btnLogout").click(function () {
  localStorage.setItem("isLoggedIn", "false");
  loginChangeMarkup()
});

function loginChangeMarkup() {
  if (localStorage.getItem("isLoggedIn") == "true") {
    console.log("loggedin");
    $(".btnUser").show();
    $(".btnLogout").show();
    $(".btnRegister").hide();
    $(".btnLogin").hide();
  }else {
    $(".btnUser").hide();
    $(".btnLogout").hide();
    $(".btnRegister").show();
    $(".btnLogin").show();
  }
}

// -> ACOUNT DETAILS //

$(document.body).on('click', '.btnUser' , function() {
  var accountMarkup = document.getElementById("accountInfo");
  if (accountMarkup) {
    document.getElementById("accountInfo").style.display = "none";
  }else {
    var userInfo = JSON.parse(localStorage.user),
        user = userInfo.user.credentials,
        userCredentials = [user.title, user.firstName, user.lastName, user.email, user.bday, user.phone, user.PassNr, user.CompanyName];
        template = '<span class="account-span-">Title: '+user.title+'</span>\
                    <span class="account-span-">Fist Name: '+user.firstName+'</span>\
                    <span class="account-span-">Last Name: '+user.lastName+'</span>\
                    <span class="account-span-">Email: '+user.email+'</span>\
                    <span class="account-span-">Birthdate: '+user.bday+'</span>\
                    <span class="account-span-">Phone: '+user.phone+'</span>\
                    <span class="account-span-">Passport: '+user.PassNr+'</span>\
                    <span class="account-span-">Company: '+user.CompanyName+'</span>';
    $("#accountContainer").children(".box-overlay").html(template);

  }
});

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

  var data = JSON.stringify(userjson);

  localStorage.setItem("user", data);

  swal("User successfully registered", "Please login to use the service", "success");
  

})
$("#login").click(function () {
  var formData = $.parseJSON(localStorage.user),
      mail = formData.user.credentials.email,
      pass = formData.user.credentials.password,
      inputMail = $("input[name='loginMail']").val(),
      inputPass = $("input[name='loginPass']").val();

  if ((inputMail == mail) && (inputPass == pass)) {

    swal("Success", "You've been logged in!", "success")

    localStorage.setItem("isLoggedIn", "true");
    loginChangeMarkup();

  }else {
    sweetAlert("Login failed", "Password and username did not match", "error");
    console.log("pw: "+pass+" m: "+mail);
  }
})
