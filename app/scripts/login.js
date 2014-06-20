var LoginView = Backbone.View.extend({

  renderedTemplate: _.template($('#login-template').text()),

  events: {},

  initialize: function() {
    $('.content-wrapper').html(this.el)
    this.render()
  },

  render: function() {
    this.$el.html(this.renderedTemplate())
  }
})