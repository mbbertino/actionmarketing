var QuoteView = Backbone.View.extend({

  className: "about-page",

  renderedTemplate: _.template($('#request-template').text()),

  events: {

  },

  initialize: function() {
    $('.content-wrapper').html(this.el)
    this.render()

    $('.link').removeClass('link-border')
  },

  render: function() {
    this.$el.html(this.renderedTemplate())
  }
})