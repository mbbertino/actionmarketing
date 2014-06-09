var AppView = Backbone.View.extend({

  renderedTemplate: _.template($('#appview-template').text()),

  events: {
    "click .js-all-services": "services"
  },

  initialize: function() {
    $('.content-wrapper').html(this.el)
    this.render()
  },

  services: function() {
    window.router.navigate("/services", {
      trigger: true
    });

    $('html, body').animate({
      scrollTop: 0
    }, 1000);
  },

  render: function() {
    this.$el.html(this.renderedTemplate())
  }
})