/*global jQuery */

/**
 * Main site scripts for <%= projectName %>
 *
 * @copyright <%= date.year %> <%= ghName %>
 */

(function($) {
'use strict';

$('.nav-tabs a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
});

}(jQuery));

