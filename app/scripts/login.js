var LoginView = Backbone.View.extend({

  renderedTemplate: _.template($('#login-template').text()),

  events: {
    "click .js-login": "login"
  },

  initialize: function() {
    $('.content-wrapper').html(this.el)
    this.render()


    $('.link').removeClass('link-border')
    $('.link-client').addClass('link-border')
  },

  login: function() {
    Parse.User.logIn($('.username').val(), $('.password').val(), {
      success: function(user) {
        window.router.navigate("/client-login/" + user.attributes.username, {
          trigger: true
        });
      },
      error: function(user, error) {
        // The login failed. Check error to see why.
      }
    })

  },

  render: function() {
    this.$el.html(this.renderedTemplate())
  }
})