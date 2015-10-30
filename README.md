# cartilage
Cartilage is a less than bare-bones Wordpress starter theme. It is built using [Sass](http://sass-lang.com/), [Bourbon](https://github.com/thoughtbot/bourbon), and [Neat](https://github.com/thoughtbot/neat).

## Dependencies
You must have [npm](https://nodejs.org/), [bower](http://bower.io/), and [gulp](http://gulpjs.com/) installed globally for this project to function! Of course, if you're using the excellent cloud based IDE [Cloud9](http://www.c9.io), like I did to create this, you've already got those installed in your workspace.

## Usage
Clone this repo into your wp-content/themes folder, `cd` into the `cartilage` directory, then run the following commands:
```
npm install && bower install
```
While those run, edit wp-config.php to say:
```
define('WP_DEBUG', true);
```
When that is finished, run:
```
gulp dev --watch
```
And then go to town! 

### IMPORTANT
To use the development versions of compiled assets, you *MUST* set `'WP_DEBUG'` to `true` in your `wp-config.php`. 
Otherwise, the theme will link to the minified production assets located in `public/js` and `public/css`.
You'll want to turn that flag back to false, and then run `gulp prod` prior to launching.

## Details
Sample sass partials are located in `src/sass/partials`. If you're going to create a new sass stylesheet, make sure to `@import` it in `src/sass/master.sass`.

The gulpfile is structured to differentiate between production and dev builds. 

### Dev `gulp dev`
For a one-time dev build, just run `gulp dev`. This will output concatenated, but not minified assets into the `dev/css` and `dev/js` folders.

You can also run `gulp dev --watch` to run a dev build, and then also start the watch task to have builds continue as files are updated.

In order to have the theme use these versions of the assets, you will need to edit `wp-config.php` in the root of your wordpress install (not the theme directory).

Change the line `define('WP_DEBUG', false);` to `define('WP_DEBUG', true);`

### Production `gulp prod`
This will run a one time production build, which will concatenate, minify, and sourcemap all javascript and css. These will put output into the `public/js` and `public/css' folder.

By default, the theme will link to these files. You will want to run this command, and also ensure WP_DEBUG is false, before launching.

Note that you can also use the watch flag here. Just run `gulp prod --watch`.

## What this project ISN'T
This theme is intended for developers building a Wordpress powered site from the ground up. It contains no default styles, and ZERO code. Do not expect to install this, set it as the active theme, and see anything other than a blank white page.

I created this for myself and my team to speed up production of new projects by gathering all of the prerequisites in one place, and have a gulpfile that needs no configuration. If you're a developer, it might save you some time. If you're just a Wordpress user, this is NOT for you.

## Notes
This project uses [Bourbon](https://github.com/thoughtbot/bourbon) and [Neat](https://github.com/thoughtbot/neat), they will be installed for you by bower, and are included in the sass stylesheet for you in `dev/sass/master.sass`.