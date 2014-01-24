# Generator-pxa-frontend 

[![Build Status](https://secure.travis-ci.org/dmh/generator-pxa-frontend.png?branch=master)](https://travis-ci.org/dmh/generator-pxa-frontend)  [![NPM version](https://badge.fury.io/js/generator-pxa-frontend.png)](http://badge.fury.io/js/generator-pxa-frontend)  [![Dependency Status](https://david-dm.org/dmh/generator-pxa-frontend.png)](https://david-dm.org/dmh/generator-pxa-frontend)  [![devDependency Status](https://david-dm.org/dmh/generator-pxa-frontend/dev-status.png)](https://david-dm.org/dmh/generator-pxa-frontend#info=devDependencies)

##Pxa-frontend
[Pxa-frontend](https://npmjs.org/package/generator-pxa-frontend "Pxa-frontend") 
>Script for add simple changes to css in Foundation2013. It works in local enviroment without Typo3 instalation. Also it works with livereload, so you can see changes without reload web page.

**First step**

Components what you need:

1. Install git, if you have not done it before. (you can check, whether git present in your computer, run `git --version` in terminal). [GIT](http://git-scm.com/ "git")
2. Instal NodeJs (Version>=0.10) It automatically install NPM (Node Package Manager). (Check it, run `node -v`, `npm -v`). [NODEJS](http://nodejs.org/ "nodejs")
3. Install Yeoman. Run: `sudo npm install -g yo`. [YEOMAN](http://yeoman.io/ 'yeoman'). This will install Grunt and Bower automatically. If no, you should install it manual: `sudo npm install -g grunt-cli`, `sudo npm install -g bower`. [BOWER](http://bower.io/ 'bower'), [GRUNT](http://gruntjs.com/ 'grunt')
4. Install **generator-pxa-frontend**. Run: `sudo npm install -g generator-pxa-frontend`. [Pxa-frontend](https://npmjs.org/package/generator-pxa-frontend 'pxa-frontend')
To update pxa-frontend script run: sudo `npm update -g generator-pxa-frontend`

***

####Now you have all needed dependencies in your computer and you can start work with Foundation project.

**Second step:**

1. Create and open directory with your new project
`mkdir newproject && cd $_`
2. Then start frontend script
`yo pxa-frontend`
3. Next, script ask you, ssh link of your project repository in Bitbucket, and, is it shared project, or not.
4. After this, script will install all dependencies in node\_modules folder and bower\_components:
 * bootstrap 2.3.2
 * pxa\_bootstrap
 * pxa\_fluidcontent
 * pxa\_foundation\_layout
 * pxa\_foundation
5. Next, start pxa-frontend script. Run: `./start` or `grunt go` (_Mac_), `win-start` (_Windows_). After some manipulation with files, this script starts local server and also starts watch process. So if you change some files, server automaticaly reload styles, and you can see your changes in live.
6. To stop script press `ctrl + c
7. To commit changes run: `./commit` (_Mac_), `commit` (_Windows_).
Important! You should be sure that anybody didn't do any changes on the server, before start commit with this script. If no, then you should work with git manualy, without commit script.

***

####Also you can check your pxa modules using command:
 * `./pxa-list` Mac
 * `pxa-list` Windows
 * Or enter `bower list` everywhere

####To update pxa modules enter:
 * `./update` Mac
 * `update` Windows

## Release History

 * 24-01-2014 v0.0.12
  - froze dependencies, update Readme

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
