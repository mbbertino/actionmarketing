var ServicesView = Backbone.View.extend({

  renderedTemplate: _.template($('#services-template').text()),

  events: {
    "click .js-nav-one": "moveToOne",
    "click .js-nav-two": "moveToTwo",
    "click .js-nav-three": "moveToThree",
  },

  initialize: function() {
    $('.content-wrapper').html(this.el)
    this.render()


    $('.link').removeClass('link-border')
    $('.link-services').addClass('link-border')

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

  moveToOne: function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1000);
  },

  moveToTwo: function() {
    $('html, body').animate({
      scrollTop: $('#fill').offset().top - 15
    }, 1000);
  },

  moveToThree: function() {
    $('html, body').animate({
      scrollTop: $('#data').offset().top - 15
    }, 1000);
  },

  render: function() {
    this.$el.html(this.renderedTemplate())
  }
})