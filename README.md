# cartilage
Cartilage is an almost bare-bones wordpress starter theme. It is built using [Sass](http://sass-lang.com/), [Bourbon](https://github.com/thoughtbot/bourbon), and [Neat](https://github.com/thoughtbot/neat), 

## Dependencies
You must have [npm](https://nodejs.org/) and [bower](http://bower.io/) installed globally for this project to function! Of course, if you're using the EXCELLENT cloud based IDE [Cloud9](http://www.c9.io), like I did to create this, you've already got those installed in your workspace.

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

## Notes
This project uses [Bourbon](https://github.com/thoughtbot/bourbon) and [Neat](https://github.com/thoughtbot/neat), they will be installed for you by bower, and are included in the sass stylesheet for you in `dev/sass/master.sass`.