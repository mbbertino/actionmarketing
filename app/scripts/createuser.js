var CreateUserView = Backbone.View.extend({

  className: 'upload-wrapper col-xs-12',

  renderedTemplate: _.template($('#create-user-template').text()),

  events: {
    "click .js-create": "createUser"
  },

  initialize: function() {
    $('.upload-section').html(this.el)
    this.render()
  },

  createUser: function() {
    var username = this.$('.js-username').val();
    var password = this.$('.js-password').val();
    var email = this.$('.js-email').val();

    Parse.Cloud.run('createNewUser', {
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
  },

  render: function() {
    this.$el.html(this.renderedTemplate())
  }
})