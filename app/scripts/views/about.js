var AboutView = Backbone.View.extend({

  className: "about-page",

  renderedTemplate: _.template($('#about-template').text()),

  events: {

  },

  initialize: function() {
    $('.content-wrapper').html(this.el)
    this.render()

    $('.link').removeClass('link-border')
    $('.link-about').addClass('link-border')

    var map;

    function initialize() {
      var myLatlng = new google.maps.LatLng(26.924099, -80.144593);
      var mapOptions = {
        scrollwheel: false,
        zoom: 14,
        center: myLatlng
      };
      map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

      var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Action Marketing'
      });
    }

    initialize()

  },

  render: function() {
    this.$el.html(this.renderedTemplate())
  }
})