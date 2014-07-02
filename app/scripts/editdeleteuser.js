var EditDeleteUserView = Backbone.View.extend({

  className: 'upload-wrapper col-xs-12',

  renderedTemplate: _.template($('#edit-delete-user-template').text()),

  events: {
    "click .js-delete": "deleteUser",
    "click .js-edit": "editUser",
    "change .js-user-list": "updateInputValues"
  },

  initialize: function() {
    $('.upload-section').html(this.el)
    this.render()

    var query = new Parse.Query(Parse.User);

    query.find({
      success: function(users) {
        _.each(users, function(user) {
          new UserListView({
            model: user
          })
        })
      }
    })
  },

  updateInputValues: function() {
    console.log(this.$('.js-user-list option:selected'))
    var that = this
    var userQuery = new Parse.Query(Parse.User);
    userQuery.get(this.$('.js-user-list option:selected')[0].id, {
      success: function(user) {
        console.log(user)
        this.$('.js-username').val(user.attributes.username)
        this.$('.js-password').val("the user must change their own password")
        this.$('.js-email').val(user.attributes.email)
        this.$('.js-id').val(user.id)
      },
      error: function(error) {
        response.error("Could not find user.");
      }
    })

  },

  deleteUser: function() {
    if (this.$('.js-id').val() !== "") {
      var badUserID = this.$('.js-id').val();

      Parse.Cloud.run('deleteUser', {
        badUserID: badUserID
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
    }
  },

  editUser: function() {
    if (this.$('.js-id').val() !== "") {
      var userID = this.$('.js-id').val()
      var username = this.$('.js-username').val()
      var password = this.$('.js-password').val()
      var email = this.$('.js-email').val();

      Parse.Cloud.run('editUser', {
        editUserID: userID,
        username: username,
        password: password,
        email: email
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
    }
  },

  render: function() {
    this.$el.html(this.renderedTemplate())
  }
})