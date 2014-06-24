var FilePortalView = Backbone.View.extend({

  renderedTemplate: _.template($('#fileportal-template').text()),

  events: {},

  initialize: function() {
    $('.content-wrapper').html(this.el)
    this.render()


    $('.link').removeClass('link-border')
    $('.link-client').addClass('link-border')
  },

  render: function() {
    this.$el.html(this.renderedTemplate())
  }
})