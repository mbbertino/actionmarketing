$(document).ready(function() {
  Parse.initialize("0NPDH9dF1j1bzL7Np4qyhwrEklrhRufzbFtSzcQ5", "oS05oUW4w641gXfBU8HtgIgLNktILc5lgGfAFHHs");

  window.router = new MainRouter();
  Backbone.history.start();

  $(".js-request-quote-btn").on("click", function() {
    window.router.navigate("/about", {
      trigger: true
    });
    $('html, body').animate({
      scrollTop: $('#quote-form').offset().top - 15
    }, 1000);
  });

});