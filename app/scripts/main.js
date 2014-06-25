$(document).ready(function() {
  Parse.initialize("0NPDH9dF1j1bzL7Np4qyhwrEklrhRufzbFtSzcQ5", "oS05oUW4w641gXfBU8HtgIgLNktILc5lgGfAFHHs");

  window.router = new MainRouter();
  Backbone.history.start();

  // var roleACL = new Parse.ACL();
  // roleACL.setRoleWriteAccess('Admin', true);
  // roleACL.setRoleReadAccess('Admin', true);
  // roleACL.setPublicReadAccess(true);
  // var role = new Parse.Role("Admin", roleACL);
  // role.getUsers().add(Parse.User.current());

  // role.save(null, {
  //   success: function(saveObject) {
  //     alert("Woot, I figured it out!!!")
  //   },
  //   error: function(saveObject, error) {
  //     alert("Failed creating role with error: " + error.code + ":" + error.message);
  //   }
  // });




});