var FileView = Backbone.View.extend({
  tagName: "li",

  renderedTemplate: _.template($('#file-view-template').text()),

  events: {},

  initialize: function() {
    $('.file-list-box').append(this.el)
    this.render()
  },

  render: function() {
    this.$el.html(this.renderedTemplate())
  }
})