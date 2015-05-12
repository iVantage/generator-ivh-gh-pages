
(function(win, $) {
/**
 * Make it slightly less of a pain when setting up the site. This is a generator
 * for GitHub pages, we can determine the URL for the respective repo from the
 * gh-site url
 */
var l = win.location
  , host = l.hostname
  , path = l.pathname;

if(/^(\w+)\.github\.io$/.exec(host)) {
  // GitHub pages...
  var url = 'https://github.com/' + RegExp.$1 + '/';
  /^\/(\w+)\//.exec(path);
  url += RegExp.$1;
  $('a[data-repo-link]').attr('href', url);
}

}(window.top, jQuery));
