global.jQuery = require('jquery');
bootstrap = require('bootstrap');
mustache = require('mustache');


jQuery(document).ready(function($) {
    var jqxhr = $.getJSON('data.json', function() {

    }).done(function(data) {
        var template = $('#template').html();
        var showTemplate = mustache.render(template, data);
        $('#gallery').html(showTemplate);
    });


    $('.nav-button').click(function(){
        var txt = $(this).text();
        (txt === "Menu") ? $(this).text("Close Menu") : $(this).text("Menu");
        $('.main-nav').toggleClass('inPosition');
        $('#main-wrapper').toggleClass('addMargin');
    });

});

