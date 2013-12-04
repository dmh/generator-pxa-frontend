'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var PxaFrontendGenerator = module.exports = function PxaFrontendGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(PxaFrontendGenerator, yeoman.generators.Base);

PxaFrontendGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.

  var prompts = [{
    type: 'input',
    name: 'gitt',
    message: 'project repo?',
    default: true
  }];

  this.prompt(prompts, function (props) {
    this.gitt = props.gitt;
    this.dirr = props.gitt.replace('git@bitbucket.org:pixelant/', '').replace('.git', '');



  // console.log(this.git);
  // console.log(this.dirr);
    cb();
  }.bind(this));
};

PxaFrontendGenerator.prototype.app = function app() {
  this.mkdir('temp');
  this.mkdir('temp/pxa_ext');
  this.mkdir('foundation_static_site');
  this.mkdir('foundation_static_site/assets');

  this.copy('_package.json', 'package.json');
  this.copy('_repo', 'repo');
  this.copy('_bower.json', 'bower.json');
  this.copy('gitignore', '.gitignore');
  this.copy('jshintrc', '.jshintrc');
  this.copy('start', 'start');
  this.copy('index.html', 'foundation_static_site/index.html');
  this.template('Gruntfile.js');
};
