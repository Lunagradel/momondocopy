$( document ).ready( function() {
  $(".canvas").hide();
});

$(".regular-button").click(function () {
    switch ($(this).attr("data-canvas")) {
      case "register":
      showCanvas("register")
      break;
      case "login":
      showCanvas("LoginContainer")
      break;
      case "account":
      showCanvas("accountContainer")
        break;
    }
});

$(".canvas").click( function(e) {
  if (e.target == this) {
    $(this).children(":first").animate({
      top: "100%"
    }, 100, "swing", function () {
      $(this).parent().hide();
    });
  }
});


function showCanvas(canvas) {
  var element = "#"+canvas,
      child = $(element).children(":first");
  $(element).css("top",0).fadeIn(100, function () {
    $(child).animate({
      top: "20%"
    }, 100, "swing", function() {
    });
  });
};
