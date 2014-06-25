var FilePortalView = Backbone.View.extend({

  renderedTemplate: _.template($('#fileportal-template').text()),

  events: {
    "click .js-upload": "save"
  },

  initialize: function() {
    $('.content-wrapper').html(this.el)
    this.render()

    $('.link').removeClass('link-border')
    $('.link-client').addClass('link-border')
  },

  save: function() {
    var fileUploadControl = $("#profilePhotoFileUpload")[0];
    if (fileUploadControl.files.length > 0) {
      var file = fileUploadControl.files[0];
      var name = "photo.jpg";

      var parseFile = new Parse.File(name, file);
    }

    var newFile = new File()
    newFile.set('profilePic', parseFile);
    newFile.set('client', Parse.User.current());
    newFile.save(null, {
      success: function(results) {
        alert("Woot!!")
      }
    })
  },

  render: function() {
    this.$el.html(this.renderedTemplate())
  }
})