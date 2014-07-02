var UserListView = Backbone.View.extend({

  tagName: "option",

  renderedTemplate: _.template($('#user-list-template').text()),

  events: {

  },

  initialize: function() {
    $('.js-user-list').append(this.el)
    this.render()
  },

  render: function() {
    this.$el.append(this.renderedTemplate())
    this.$el.attr({
      id: this.model.id
    })
  }
})