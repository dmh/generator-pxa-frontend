# Generator-pxa-frontend 

[![Build Status](https://secure.travis-ci.org/dmh/generator-pxa-frontend.png?branch=master)](https://travis-ci.org/dmh/generator-pxa-frontend)

[![NPM version](https://badge.fury.io/js/generator-pxa-frontend.png)](http://badge.fury.io/js/generator-pxa-frontend)

[![Dependency Status](https://david-dm.org/dmh/generator-pxa-frontend.png)](https://david-dm.org/dmh/generator-pxa-frontend)

##Pxa-frontend
[Pxa-frontend](https://npmjs.org/package/generator-pxa-frontend "Pxa-frontend") 
>Script for add simple changes to css in Foundation2013. It works in local enviroment without Typo3 instalation. Also it works with livereload, so you can see changes without reload web page.

Components what you need:

1. Git
2. Install NodeJs http://nodejs.org/
3. Install Yeoman `sudo npm install -g yo`
    > This will install Grunt and Bower automatically. If no, you should install it manual:
    `sudo npm install -g grunt-cli`
    &
    `sudo npm install -g bower`
    ####_Links:_
 * [Bower](http://bower.io/ "bower") 
 * [Grunt](http://gruntjs.com/ "gruntjs") 
 * [Yeoman](http://yeoman.io/ "yeoman") 

4. And of course you should install  generator-pxa-frontend: 
    `sudo npm install -g generator-pxa-frontend`
***

####Now you have frontend script in your computer
**Second step:**

1. Create directory with your new project
`mkdir newproject && cd $_`
2. Then start frontend script
`yo pxa-frontend`
3. Next, script ask you, ssh link of your project repository in Bitbucket, and, is it shared project, or not.
4. After this, script will install all dependencies in node_modules folder, bower_components (bootstrap 2.3.2, jquery, pxa_bootstrap, pxa_fluidcontent, pxa_foundation_layout, pxa_foundation), and other stuff.
5. Next, you can start script:
**Mac Os & Ubuntu**
`./start`
or
`grunt go`
**Windows**
`win-start`
 * After some time it open default browser with foundation page and start watch process with livereload. Now you can open project folder, that automatically cloned from bitbucket, open in it  (/fileadmin/Pixelant/Css), and edit custom.less, variables.less. Changes automatically will reload in browser. Default link is _localhost:9004_ . When you finished editing css styles, you should stop watch process in terminal (**ctrl + C**).
6. Now you can commit your changes
Enter ( **./commit** ) in Terminal (_MAC_), or ( **commit** ) in Terminal (_Windows_)
It automatically commit and push your changes to bitbucket.
__Important!__ Testing commit function in test project.
***

####Also you can check your pxa modules using command:
 * ( **./pxa-list** ) Mac
 * ( **pxa-list** ) Windows
 * Or enter ( **bower list** ) everywhere

####To update pxa modules enter:
 * ( **./update** ) Mac
 * ( **update** ) Windows

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
