var FilePortalView = Backbone.View.extend({

  className: 'upload-wrapper col-xs-12',

  renderedTemplate: _.template($('#fileportal-template').text()),

  events: {
    "click .js-upload": "save",
    "click .js-logout": "logout",
    "click .js-create": "createUser",
    "click .js-edit": "editUser",
    "click .js-delete": "deleteUser"
  },

  initialize: function() {
    $('.content-wrapper').html(this.el)
    this.render()

    $('.link').removeClass('link-border')
    $('.link-client').addClass('link-border')

    var query = new Parse.Query('Files');

    query.find({
      success: function(files) {

        _.defer(function() {
          var options = {
            valueNames: ['name', 'date', 'fileName']
          };
          var userList = new List('file-list', options);
        });
        _.each(files, function(file) {
          new FileView({
            model: file
          })
        })
      }
    })
  },

  deleteUser: function() {
    var badUserID = 'mkU5LzaOvg';

    Parse.Cloud.run('deleteUser', {
      badUserID: badUserID
    }, {
      success: function(result) {
        console.log('woot!')
      },
      error: function(error) {
        console.log(error)
      }
    });
  },

  editUser: function() {
    var userID = 'mkU5LzaOvg';
    var username = "matt";
    var password = "mary";
    var email = "mary@gmail.com";

    Parse.Cloud.run('editUser', {
      editUserID: userID,
      username: username,
      password: password,
      email: email
    }, {
      success: function(result) {
        console.log('woot')
      },
      error: function(error) {
        console.log(error)
      }
    });
  },

  createUser: function() {
    var username = "mary";
    var password = "mary";
    var email = "mary@gmail.com";

    Parse.Cloud.run('createNewUser', {
      username: username,
      password: password,
      email: email
    }, {
      success: function(result) {
        console.log("woot")
      },
      error: function(error) {
        console.log(error)
      }
    });
  },

  logout: function() {
    Parse.User.logOut()
    window.router.navigate("/client-login", {
      trigger: true
    });
  },

  save: function() {
    var fileUploadControl = $("#file-upload-input")[0];
    if (fileUploadControl.files.length > 0) {
      var file = fileUploadControl.files[0];
      var name = file.name;
      var parseFile = new Parse.File(name, file);
    }

    parseFile.save().then(function() {
      var newFile = new LoadedFile()
      var now = new Date().getTime();
      newFile.set('file', parseFile);
      newFile.set('fileName', name);
      newFile.set('tStamp', now);
      newFile.set('clientName', Parse.User.current().attributes.username);

      var fileACL = new Parse.ACL(Parse.User.current())
      fileACL.setRoleReadAccess('Admin', true)
      fileACL.setRoleWriteAccess('Admin', true)

      newFile.setACL(fileACL)
      newFile.save(null, {
        success: function(results) {
          alert("File succesfully uploaded.")
        }
      })
    }, function(error) {
      alert("file unable to upload")
    });
  },

  render: function() {
    this.$el.html(this.renderedTemplate())
  }
})