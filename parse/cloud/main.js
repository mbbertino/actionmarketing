var _ = require('underscore')

// Dad needs
// Some sort of admin panel to read all user objects

Parse.Cloud.define("createNewUser", function(request, response) {
  var newUser = new Parse.User();

  newUser.set("username", request.params.username);
  newUser.set("password", request.params.password);
  newUser.set("email", request.params.email);

  newUser.signUp(null, {
    success: function(user) {
      response.success(console.log(user))
      // Send an email on creation of User to new user
    },
    error: function(user, error) {
      response.error(alert("Error: " + error.code + " " + error.message))
    }
  });

});

Parse.Cloud.define("editUser", function(request, response) {
  if (!request.user) {
    response.error("Must be signed in to call this Cloud Function.")
    return;
  }

  Parse.Cloud.useMasterKey();
  // Edit other User
  // Send an email on creation of User to new user

  var userQuery = new Parse.Query(Parse.User);
  userQuery.get(request.params.userID, {
    success: function(anotherUser) {
      anotherUser.set("username", request.params.username);
      anotherUser.set("password", request.params.password);
      anotherUser.set("email", request.params.email);

      // Save the user.
      anotherUser.save(null, {
        success: function(anotherUser) {
          // The user was saved successfully.
          response.success("Successfully updated user.");
        },
        error: function(gameScore, error) {
          // The save failed.
          // error is a Parse.Error with an error code and description.
          response.error("Could not save changes to user.");
        }
      });
    },
    error: function(error) {
      response.error("Could not find user.");
    }
  })

});

Parse.Cloud.define("deleteUser", function(request, response) {
  // Delete other User

});

Parse.Cloud.define("fileJustUploaded", function(request, response) {
  // Send an email to Admin and User when a file is uploaded

});

Parse.Cloud.define("fileDownloaded", function(request, response) {
  // Send an email to Admin when a file is downloaded with a log of the user who downloaded the file

});