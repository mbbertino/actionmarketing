Parse.Cloud.define("sendMandrillTemplate", function(request, response) {
  var Mandrill = require('cloud/mandrillTemplateSend.js');
  Mandrill.initialize('M2-IBclvNFiIWRFknimXWw');

  Mandrill.sendTemplate({
    "template_name": request.params.templateName,
    "template_content": [{
      "name": "example name",
      "content": "example content"
    }],
    "message": {
      "to": [{
        "email": request.params.toEmail,
        "name": request.params.toClientName,
      }],
      "from_email": "ActionMarketing@gmail.com",
      "from_name": "Action Marketing",
      "subject": request.params.toSubject,
      "inline_css": true,
      "merge_vars": [{
        "rcpt": request.params.toEmail,
        "vars": [{
          "name": "clientname",
          "content": request.params.toClientName
        }, {
          "name": "username",
          "content": request.params.toUserName
        }, {
          "name": "password",
          "content": request.params.toPassword
        }]
      }],
    },
    "async": false
  }, {
    success: function(httpResponse) {
      response.success("Email sent!");
    },
    error: function(httpResponse) {
      response.error("Uh oh, something went wrong");
    }
  });
});

Parse.Cloud.define("sendUploadTemplate", function(request, response) {
  var Mandrill = require('cloud/mandrillTemplateSend.js');
  Mandrill.initialize('M2-IBclvNFiIWRFknimXWw');

  Mandrill.sendTemplate({
    "template_name": "fileupload",
    "template_content": [{
      "name": "example name",
      "content": "example content"
    }],
    "message": {
      "to": [{
        "email": request.params.toEmail,
        "name": request.params.toClientName,
      }],
      "from_email": "ActionMarketing@gmail.com",
      "from_name": "Action Marketing",
      "subject": "Successful File Upload",
      "inline_css": true,
      "merge_vars": [{
        "rcpt": request.params.toEmail,
        "vars": [{
          "name": "clientname",
          "content": request.params.toClientName
        }, {
          "name": "filename",
          "content": request.params.fileName
        }, {
          "name": "dateuploaded",
          "content": request.params.dateuploaded
        }]
      }],
    },
    "async": false
  }, {
    success: function(httpResponse) {
      response.success("Email sent!");
    },
    error: function(httpResponse) {
      response.error("Uh oh, something went wrong");
    }
  });
});

Parse.Cloud.define("createNewUser", function(request, response) {
  var newUser = new Parse.User();

  newUser.set("username", request.params.username);
  newUser.set("clientname", request.params.clientname);
  newUser.set("password", request.params.password);
  newUser.set("email", request.params.email);

  newUser.signUp(null, {
    success: function(user) {
      response.success(console.log(user))
      Parse.Cloud.run('sendMandrillTemplate', {
        templateName: "welcome",
        toSubject: "Welcome",
        toUserName: request.params.username,
        toClientName: request.params.clientname,
        toPassword: request.params.password,
        toEmail: request.params.email,
      }, {
        success: function(result) {
          new FilePortalView({
            model: Parse.User.current()
          })
        },
        error: function(error) {
          console.log(error)
        }
      });
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
  var userQuery = new Parse.Query(Parse.User);
  userQuery.get(request.params.editUserID, {
    success: function(anotherUser) {
      anotherUser.set("username", request.params.username);
      anotherUser.set("clientname", request.params.clientname);
      anotherUser.set("email", request.params.email);

      anotherUser.save(null, {
        success: function(anotherUser) {
          response.success("Successfully updated user.");
          // Send an email on edit of User to user
        },
        error: function(gameScore, error) {
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
  if (!request.user) {
    response.error("Must be signed in to call this Cloud Function.")
    return;
  }
  if (request.user.id !== "O8DvzHJhpG") {
    response.error("You must be ActionMarketing to access this functionality.")
    return;
  }
  if (request.params.badUserID === "O8DvzHJhpG") {
    response.error("can not delete user with the id of: " + request.params.badUserID)
  }
  Parse.Cloud.useMasterKey();
  var userQuery = new Parse.Query(Parse.User);
  userQuery.get(request.params.badUserID, {
    success: function(anotherUser) {
      anotherUser.destroy(null, {
        success: function(anotherUser) {
          response.success("Successfully deleted a user.");
        },
        error: function(gameScore, error) {
          response.error("Could not delete user.");
        }
      });
      response.success("Successfully deleted a user.");
    },
    error: function(error) {
      response.error("Could not find user.");
    }
  })
});

// This works to send a simple email but I want to learn to get templates working
// Parse.Cloud.define("sendEmailPrac", function(request, response) {
// 	var Mandrill = require('mandrill');
// 	Mandrill.initialize('M2-IBclvNFiIWRFknimXWw');
// 	Mandrill.sendEmail({
// 	  message: {
// 	    text: "Hello World!",
// 	    subject: "Using Cloud Code and Mandrill is great!",
// 	    from_email: "parse@cloudcode.com",
// 	    from_name: "Cloud Code",
// 	    to: [
// 	      {
// 	        email: "mattbertino@gmail.com",
// 	        name: "Your Name"
// 	      }
// 	    ]
// 	  },
// 	  async: true
// 	},{
// 	  success: function(httpResponse) {
// 	    console.log(httpResponse);
// 	    response.success("Email sent!");
// 	  },
// 	  error: function(httpResponse) {
// 	    console.error(httpResponse);
// 	    response.error("Uh oh, something went wrong");
// 	  }
// 	});
// 	// to call this I just run Parse.Cloud.run('sendEmailPrac') from terminal or any other js file
// });