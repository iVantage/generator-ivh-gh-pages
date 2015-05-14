'use strict';
var path = require('path')
  , yeoman = require('yeoman-generator')
  , chalk = require('chalk')
  , yosay = require('yosay')

var ucFirst = function(wrd) {
  return wrd.charAt(0).toUpperCase() + wrd.slice(1);
};

var prettify = function(name) {
  return name.trim()
    .split(/[^\w\d_]+/)
    .map(function(n) {
      return n.length > 2 ? ucFirst(n) : n;
    })
    .join(' ')
};

var urlify = function(pretty) {
  return pretty
    .toLowerCase()
    .replace(/[^\w\d_]+/g, ' ')
    .trim()
    .replace(/\s+/g, '-');
};

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the laudable ' + chalk.red('IvhGhPages') + ' generator!'
    ));

    var prompts = [{
      name: 'ghName',
      message: 'What is your name on GitHub?',
      default: 'iVantage'
    },{
      name: 'projectName',
      message: 'What is the (pretty) name of the project this site is for?',
      default: prettify(path.basename(process.cwd()))
    }];


    this.prompt(prompts, function (props) {
      var now = new Date();
      props.date = {year: now.getFullYear()};

      this.props = props;

      // Using nested prompts to use prior answer as part of default for next
      // question
      var prompts2 = [{
        name: 'siteUrl',
        message: 'What is the url for your project code?',
        default: 'https://github.com/' + props.ghName + '/' + urlify(props.projectName)
      }]

      this.prompt(prompts2, function(props2) {
        for(var p in props2) {
          if(p && props2.hasOwnProperty(p)) {
            this.props[p] = props2[p];
          }
        }

        this.props.projectId = props2.siteUrl
          .replace(/^.*\//, '')
          .replace(/\.*$/, '');

        done();
      }.bind(this));
    }.bind(this));
  },

  writing: {
    app: function () {
      [
        '_package.json',
        '_bower.json',
        'index.html',
        'README.md',
        'main.js',
        'main.css'
      ].forEach(function(_f) {
        var f = _f.replace(/^_/, '');
        this.fs.copyTpl(
          this.templatePath(_f),
          this.destinationPath(f),
          this.props
        );
      }, this);

      this.fs.copy(
        this.templatePath('favicon.ico'),
        this.destinationPath('favicon.ico')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
      this.fs.copy(
        this.templatePath('buttlerc'),
        this.destinationPath('.buttlerc')
      );
      this.fs.copy(
        this.templatePath('jscsrc'),
        this.destinationPath('.jscsrc')
      );
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
    }
  },

  install: function () {
    //this.installDependencies();
  }
});
