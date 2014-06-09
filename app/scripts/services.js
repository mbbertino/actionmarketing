var ServicesView = Backbone.View.extend({

  renderedTemplate: _.template($('#services-template').text()),

  events: {},

  initialize: function() {
    $('.content-wrapper').html(this.el)
    this.render()
  },

  render: function() {
    this.$el.html(this.renderedTemplate())
  }
})