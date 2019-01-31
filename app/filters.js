function normalize(value, defaultValue) {
    if(value === null || value === undefined || value === false) {
        return defaultValue;
    }
    return value;
}

module.exports = function (env) {
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
  var filters = {}

  filters.nino = function(str) {
    str = normalize(str, '');
    return str.replace(/(\w{2})/g, '$1 ').toUpperCase();
  }

  filters.mobile = function(str) {
    str = normalize(str, '');
    return str.replace(/(\d{5})(\d{3})(\d{3})/g, '$1 $2 $3');
  }

  var dateFilter = require('nunjucks-date-filter')
  filters.date = dateFilter

  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */
  return filters
}
