/*
Copyright 2016 Andrew Reese, All rights reserved.
Licensed under GNU GPL (https://www.gnu.org/licenses/licenses.html).
*/

(function () {
    "use strict";

    var ABOUTME       = "aboutMe.txt";
    var TERMINAL      = ".terminal";
    var CAT           = "cat ";
    
    var PROMPT_CLASS  = "t-prompt";
    var PULSATE_CLASS = "pulsate";

    var PROMPT_STRING  = "drew@github:~$ ";

    // loads webpage functions
    window.onload = function () {

        $.get(ABOUTME, loadAboutMe(TERMINAL, CAT + ABOUTME), "text"); // Asynch call!

    };

    /*
    Loads specified terminal with about me file output.
    */
    function loadAboutMe(terminal, command) {

        return function(data) {
            console.log(command);

            $(terminal).empty();
            $(terminal).append(new prompt(command));

            data.split('\n').forEach(function(p) {
                console.log(p);
                $(terminal).append(new paragraph(p));
            });

            $(terminal).append(new prompt());
        }

    }

    // Returns BASH prompt with specified command, or cursor if not provided
    function prompt(command) {
        var $prompt = new paragraph();
        $prompt.addClass(PROMPT_CLASS);
        if (command) {
            $prompt.text(PROMPTSTRING + command);
        } else {
            $prompt.text(PROMPTSTRING);
            $prompt.append(new cursor());
        }
        return $prompt;
    }

    // Returns pulsing cursor for BASH prompt
    function cursor() {
        var $cursor = $('<span></span>');
        $cursor.addClass(PULSATE_CLASS);
        $cursor.text('_');
        return $cursor;
    }

    // Returns paragraph html element containing specified text
    function paragraph(text) {
        var $paragraph = $('<p></p>');
        $paragraph.text(text);
        return $paragraph;
    }

})();