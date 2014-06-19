var ServicesView = Backbone.View.extend({

  renderedTemplate: _.template($('#services-template').text()),

  events: {},

  initialize: function() {
    $('.content-wrapper').html(this.el)
    this.render()

    doThisStuffOnScroll = function() {
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 140) {
        $('.docs-sidebar').removeClass('affix-top')
        $('.docs-sidebar').addClass('affix')
      } else {
        $('.docs-sidebar').removeClass('affix')
        $('.docs-sidebar').addClass('affix-top')
      }
    }

    window.onscroll = doThisStuffOnScroll;
  },

  render: function() {
    this.$el.html(this.renderedTemplate())
  }
})