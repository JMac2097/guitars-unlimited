global.jQuery = require('jquery');
bootstrap = require('bootstrap');
mustache = require('mustache');


jQuery(document).ready(function($) {

    $('.nav-button').click(function(){
        var txt = $(this).text();
        (txt === "Menu") ? $(this).text("Close Menu") : $(this).text("Menu");
        $('.main-nav').toggleClass('inPosition');
        $('#page-wrap').toggleClass('addMargin');
    });

    $('.swipe-area').swipe({
        swipeStatus:function(event, phase, direction, distance, duration, fingers)
        {
            if (phase=='move' && direction =='right') {
                $('.main-nav').addClass('inPosition');
                $('#page-wrap').addClass('addMargin');
                $('.nav-button').text("Close Menu");
                return false;
            }
            if (phase=='move' && direction =='left') {
                $('.main-nav').removeClass('inPosition');
                $('#page-wrap').removeClass('addMargin');
                $('.nav-button').text("Menu");
                return false;
            }

        }
    })

});

