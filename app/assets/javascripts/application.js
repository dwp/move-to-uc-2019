/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()

  if(document.getElementById('hideOnSelect')) {

    document.querySelectorAll('input[type="radio"]').forEach(function(input) {
      input.addEventListener('click', function() {
        var self = this;
        if(typeof this.dataset.toggle !== 'undefined') {
          var el = document.getElementById(this.dataset.toggle);
          el.style.display = 'none';
        } else {
          document.querySelectorAll('input[type="radio"]').forEach(function(input) {
            if(input.dataset && typeof input.dataset.toggle !== 'undefined' && !input.selected) {
              var el2 = document.getElementById(input.dataset.toggle);
              el2.style.display = 'block';
            }

          });
        }
      })
    })


  }





})
