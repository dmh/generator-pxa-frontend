// log.info log.mark log.warn log.error
'use strict';
var util = require('util');
var path = require('path');
var log = require('color-log');
var yeoman = require('yeoman-generator');


var PxaFrontendGenerator = module.exports = function PxaFrontendGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
        this.on('end', function () {
          if (this.go === 1) {
          this.installDependencies({ skipInstall: options['skip-install'] });
          };
        });


  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(PxaFrontendGenerator, yeoman.generators.Base);

PxaFrontendGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.

  console.log('');
  log.mark('Project repository in bitbucket:');
  console.log('--------------------------------');
  var prompts = [{
    name: 'gitt',
    message: 'SSH link'
  }];

  this.prompt(prompts, function (props) {
    this.gitt = props.gitt;
    this.go = 0;
    if (this.gitt.length > 31 && this.gitt.slice(0,27)==='git@bitbucket.org:pixelant/' && this.gitt.slice(-4)==='.git') {
        this.dirr = props.gitt.replace('git@bitbucket.org:pixelant/', '').replace('.git', '');;
        this.go = 1;
    } else {
      console.log('');
      log.error('ERROR');
      console.log('Wrong repository name, try again...');
    }

    cb();
  }.bind(this));
};

PxaFrontendGenerator.prototype.app = function app() {
    if (this.go === 1) {
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
};
