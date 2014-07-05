var AboutView = Backbone.View.extend({

  renderedTemplate: _.template($('#about-template').text()),

  events: {

  },

  initialize: function() {
    $('.content-wrapper').html(this.el)
    this.render()
  },

  render: function() {
    this.$el.html(this.renderedTemplate())
  }
})