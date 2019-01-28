(function($) {
  $('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })
})(jQuery); // End of use strict
