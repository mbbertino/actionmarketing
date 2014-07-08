var AppView = Backbone.View.extend({

  renderedTemplate: _.template($('#appview-template').text()),

  events: {
    "click .js-all-services": "services",
    "click .js-nav-one": "moveToOne",
    "click .js-nav-two": "moveToTwo",
    "click .js-nav-three": "moveToThree"

  },

  initialize: function() {
    $('.content-wrapper').html(this.el)
    this.render()

    $('.link').removeClass('link-border')
    $('.link-home').addClass('link-border')
  },

  services: function() {
    window.router.navigate("/services", {
      trigger: true
    });

    $('html, body').animate({
      scrollTop: 0
    }, 1000);
  },

  moveToOne: function() {
    window.router.navigate("/services", {
      trigger: true
    });
    $('html, body').animate({
      scrollTop: 0
    }, 1000);
  },

  moveToTwo: function() {
    window.router.navigate("/services", {
      trigger: true
    });
    $('.js-nav-two').trigger("click")
  },

  moveToThree: function() {
    window.router.navigate("/services", {
      trigger: true
    });
    $('.js-nav-three').trigger("click")
  },

  render: function() {
    this.$el.html(this.renderedTemplate())
  }
})