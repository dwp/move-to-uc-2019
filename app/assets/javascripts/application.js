/* global $ */
/* global GOVUK */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  // Use GOV.UK shim-links-with-button-role.js to trigger a link styled to look like a button,
  // with role="button" when the space key is pressed.
  GOVUK.shimLinksWithButtonRole.init()

  // Details/summary polyfill from frontend toolkit
  GOVUK.details.init()

  // Show and hide toggled content
  // Where .multiple-choice uses the data-target attribute
  // to toggle hidden content
  var showHideContent = new GOVUK.ShowHideContent()
  showHideContent.init()
})



// as JS is working, add 'tabs' class, which will style tabs and allow
// functionality
$('.js-tabs').addClass('js-tabs-enabled');

//show the first tab and content
$('.js-tabs-enabled').each(function(){
  $(this).find('.govuk-tabbed-panel__content:first').removeClass('js-hidden');
  $(this).find('.govuk-tabbed-panel__tab:first').addClass('active');
});

// click function for tabs
$('.govuk-tabbed-panel__tab').click(function(e){
  e.preventDefault();

  var tabs = $(this).parents('.js-tabs-enabled');
  var link = $(this);
  var currentTab = link.attr('href');

  // remove active class from nav and add to newly selected tab
  tabs.find('.govuk-tabbed-panel__tab').removeClass('active');
  link.addClass('active');

  // hide all of the tab content and show newly selected then update hash in URL
  tabs.find('.govuk-tabbed-panel__content').addClass('js-hidden');
  $(currentTab).removeClass('js-hidden');
  history.pushState({}, '', currentTab);
});

// check for hash in url and open that tab if its there
var hash = window.location.hash;
if (hash) {
  $('.govuk-tabbed-panel__tab[href="' + hash +'"]').click();
}
