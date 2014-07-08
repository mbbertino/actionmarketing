var MainRouter = Backbone.Router.extend({

  routes: {
    "": "home",
    "services": "services",
    "services/:id": "services",
    "client-login": "login",
    "client-login/:user": "fileUpload",
    "about": "contact"
  },

  initialize: function() {},

  home: function() {
    new AppView()
  },

  services: function(id) {
    new ServicesView({
      serviceId: id
    })
  },

  login: function() {
    if (Parse.User.current()) {
      window.router.navigate("/client-login/" + Parse.User.current().attributes.username, {
        trigger: true
      });
    } else {
      new LoginView()
    }
  },

  fileUpload: function() {
    if (Parse.User.current()) {
      new FilePortalView({
        model: Parse.User.current()
      })
    } else {
      window.router.navigate("/client-login", {
        trigger: true
      });
    }
  },

  contact: function() {
    new AboutView()
  }

})