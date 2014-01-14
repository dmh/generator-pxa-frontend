// log.info log.mark log.warn log.error
'use strict';
var util = require('util');
var path = require('path');
var log = require('color-log');
var yeoman = require('yeoman-generator');

var PxaFrontendGenerator = module.exports = function PxaFrontendGenerator(args, options) {
    yeoman.generators.Base.apply(this, arguments);
    this.on('end', function () {
            if (this.go === 1) {
                this.installDependencies({ skipInstall: options['skip-install'] });
            }
        });
    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(PxaFrontendGenerator, yeoman.generators.Base);

PxaFrontendGenerator.prototype.askFor = function askFor() {
    var cb = this.async();
    console.log('');
    log.mark('Project repository in bitbucket:');
    console.log('Example: git@bitbucket.org:pixelant/xxx.git');
    console.log('--------------------------------');
    var prompts = [{
        name: 'gitt',
        message: 'SSH link'
    }, {
        type: 'confirm',
        name: 'shared',
        message: 'Shared installation, or no? (default: Yes)',
        default: true
    }];

    this.prompt(prompts, function (props) {
        this.gitt = props.gitt;
        this.shared = props.shared;
        this.go = 0;
        if (this.gitt.length > 31 && this.gitt.slice(0, 27) === 'git@bitbucket.org:pixelant/' && this.gitt.slice(-4) === '.git') {
            this.dirr = props.gitt.replace('git@bitbucket.org:pixelant/', '').replace('.git', '');
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
        this.mkdir('src');
        this.mkdir('src/templates');
        this.mkdir('src/templates/layouts');
        this.mkdir('src/templates/pages');
        this.mkdir('src/templates/parts');
        this.copy('_package.json', 'package.json');
        this.copy('_bower.json', 'bower.json');
        this.copy('_commit', 'commit');
        this.copy('_update', 'update');
        this.copy('_pxa-list', 'pxa-list');
        this.copy('_win-start', 'win-start');
        this.copy('gitignore', '.gitignore');
        this.copy('editorconfig', '.editorconfig');
        this.copy('jshintrc', '.jshintrc');
        this.copy('_start', 'start');
        this.copy('styles.css', 'styles.css');
        this.copy('fix.css', 'fix.css');
        this.template('Gruntfile.js');
        this.copy('src/templates/layouts/layout.hbs', 'src/templates/layouts/layout.hbs');
        this.copy('src/templates/pages/funktioner.hbs', 'src/templates/pages/funktioner.hbs');
        this.copy('src/templates/pages/index.hbs', 'src/templates/pages/index.hbs');
        this.copy('src/templates/pages/kontakt.hbs', 'src/templates/pages/kontakt.hbs');
        this.copy('src/templates/pages/nyheter.hbs', 'src/templates/pages/nyheter.hbs');
        this.copy('src/templates/pages/om-foretaget.hbs', 'src/templates/pages/om-foretaget.hbs');
        this.copy('src/templates/pages/undersida-2-niva-2.hbs', 'src/templates/pages/undersida-2-niva-2.hbs');
        this.copy('src/templates/pages/undersida-niva-2.hbs', 'src/templates/pages/undersida-niva-2.hbs');
        this.copy('src/templates/pages/test.hbs', 'src/templates/pages/test.hbs');
        this.copy('src/templates/pages/test2.hbs', 'src/templates/pages/test2.hbs');
        this.copy('src/templates/pages/test2.hbs', 'src/templates/pages/test2.hbs');
        this.copy('src/templates/parts/footer.hbs', 'src/templates/parts/footer.hbs');
        this.copy('src/templates/parts/head.hbs', 'src/templates/parts/head.hbs');
        this.copy('src/templates/parts/header.hbs', 'src/templates/parts/header.hbs');
        this.copy('src/templates/parts/nav.hbs', 'src/templates/parts/nav.hbs');
        this.copy('src/templates/parts/scripts.hbs', 'src/templates/parts/scripts.hbs');
        this.copy('src/templates/parts/slider.hbs', 'src/templates/parts/slider.hbs');
    }
};
