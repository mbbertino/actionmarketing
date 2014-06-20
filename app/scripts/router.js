var MainRouter = Backbone.Router.extend({

  routes: {
    "": "home",
    "services": "services",
    "services/:id": "services",
    "client-login": "client",
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

  contact: function() {

  }

})