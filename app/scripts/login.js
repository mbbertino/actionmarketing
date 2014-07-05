var LoginView = Backbone.View.extend({

  renderedTemplate: _.template($('#login-template').text()),

  events: {
    "click .js-login": "login",
    "click .js-pw-reset": "reset",
    "click .js-reset-submit": "resetRequest",

  },

  initialize: function() {
    $('.content-wrapper').html(this.el)
    this.render()


    $('.link').removeClass('link-border')
    $('.link-client').addClass('link-border')
  },

  reset: function() {
    this.$('.js-email').toggleClass("hidden")
    this.$('.js-username').toggleClass("hidden")
    this.$('.js-password').toggleClass("hidden")
    this.$('.js-login').toggleClass("hidden")
  },

  resetRequest: function() {
    Parse.User.requestPasswordReset(this.$('.js-email-val').val(), {
      success: function() {},
      error: function(error) {
        alert("Doesn't look like you are not a current user contact Action Marketing for further information");
      }
    });
  },

  login: function() {
    Parse.User.logIn(this.$('.js-username').val(), this.$('.js-password').val(), {
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