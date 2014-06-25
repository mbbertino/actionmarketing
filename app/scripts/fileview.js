var FileView = Backbone.View.extend({

  renderedTemplate: _.template($('#file-view-template').text()),

  events: {

  },

  initialize: function() {
    $('.content-wrapper').append(this.el)
    this.render()
    console.log(this.model)
  },

  render: function() {
    this.$el.html(this.renderedTemplate())
  }
})