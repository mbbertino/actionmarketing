var FileView = Backbone.View.extend({
  tagName: "li",

  renderedTemplate: _.template($('#file-view-template').text()),

  events: {
    "click .js-destroy": "destroyFile"
  },

  initialize: function() {
    $('.file-list-box').append(this.el)
    this.render()
  },

  destroyFile: function() {
    var that = this
    this.model.destroy({
      success: function(myObject) {
        that.remove()
      },
      error: function(myObject, error) {}
    });

  },

  render: function() {
    this.$el.html(this.renderedTemplate())
  }
})