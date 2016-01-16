var elixir = require('laravel-elixir');

var paths = {
    app: "./app/",
    assets: "./assets/"
};

paths.assetsJs = paths.assets+"js/";

elixir.config.sourcemaps = false;
elixir.extend('sourcemaps', false);

elixir(function(mix) {
        
    mix.scripts(
        [
            "app.module.js",
            "pages/home/app.pages.home.controllers.js",
            "pages/home/app.pages.home.directives.js"
        ],
        paths.assetsJs+"home.js",
        paths.app
    );
    
});