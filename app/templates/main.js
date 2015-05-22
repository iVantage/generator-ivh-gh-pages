
/**
 * Main site scripts for <%= projectName %>
 *
 * @copyright <%= date.year %> <%= ghName %>
 */

$('.nav-tabs a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})
