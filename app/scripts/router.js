var MainRouter = Backbone.Router.extend({

  routes: {
    "": "home",
    "services": "services",
    "services/:id": "services",
    "client-login": "client",
    "client-login/:user": "fileUpload",
    "contact": "contact"
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

  client: function() {
    new LoginView({

    })
  },

  fileUpload: function(user) {
    new FilePortalView({
      model: user
    })
  },

  contact: function() {

  }

})