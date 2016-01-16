var elixir = require('laravel-elixir');

var paths = {
    app: "./app/",
    assets: "./assets/"
};

paths.assetsJs = paths.assets+"js/";

elixir.config.sourcemaps = false;
elixir.extend('sourcemaps', false);

elixir(function(mix) {
    
});