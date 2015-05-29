# cartilage
Cartilage is a less than bare-bones Wordpress starter theme. It is built using [Sass](http://sass-lang.com/), [Bourbon](https://github.com/thoughtbot/bourbon), and [Neat](https://github.com/thoughtbot/neat), 

## Dependencies
You must have [npm](https://nodejs.org/), [bower](http://bower.io/), and [gulp](http://gulpjs.com/) installed globally for this project to function! Of course, if you're using the excellent cloud based IDE [Cloud9](http://www.c9.io), like I did to create this, you've already got those installed in your workspace.

## Usage
Clone this repo into your wp-content/themes folder, `cd` into the `cartilage` directory, then run the following commands:
```
npm install && bower install
```
When that is finished, run:
```
gulp
```
And then go to town! 

Sample sass partials are located in `dev/sass/partials`. If you're going to create a new sass stylesheet, make sure to `@import` it in `dev/sass/master.sass`.

All sass/scss will be compiled, minified, and sourcemapped. It will then be output to the Wordpress default stylesheet as `style.css` in the root of your theme folder.

Javascript will be run through jshint to notify you of any errors in your code, and then compiled to a single file named `compiled.js` in the `public/js` folder.

## What this project ISN'T
This theme is intended for developers building a Wordpress powered site from the ground up. It contains no default styles, and ZERO code. Do not expect to install this, set it as the active theme, and see anything other than a blank white page.

I created this for myself and my team to speed up production of new projects by gathering all of the prerequisites in one place, and have a gulpfile that needs no configuration. If you're a developer, it might save you some time. If you're just a Wordpress user, this is NOT for you.

## Notes
This project uses [Bourbon](https://github.com/thoughtbot/bourbon) and [Neat](https://github.com/thoughtbot/neat), they will be installed for you by bower, and are included in the sass stylesheet for you in `dev/sass/master.sass`.