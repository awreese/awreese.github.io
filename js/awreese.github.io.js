/*
Copyright 2016 Andrew Reese, All rights reserved.
Licensed under GNU GPL (https://www.gnu.org/licenses/licenses.html).
*/

(function () {
    "use strict";

    var ABOUTME       = "aboutMe.txt";
    var TERMINAL      = "#terminal1";
    
    var PROMPT_CLASS  = "t-prompt";
    var PROMPT_STRING  = "drew@github:~$ ";

    var text;
    var outputedToConsole = false;

    var DEBUG = true;
    
    // loads webpage functions
    window.onload = function () {

        // used when testing/debugging on local machine
        if (DEBUG) {
            text = ["paragraph1", "paragraph2", "paragraph3"];
            loadAboutMe(TERMINAL, ["whoami", "finger drew", "cat " + ABOUTME], text);
        } else {
            $.get(ABOUTME, loadData, "text"); // Asynch call!
        }
        
        // loadAboutMe(TERMINAL, ["cat tax.???", "cat text.txt"], text);

        // $.get(ABOUTME, loadAboutMe(TERMINAL, CAT, ABOUTME), "text"); // Asynch call!
        // $.get(ABOUTME, loadData, "text"); // Asynch call!

    };

    function loadData(data) {
        text = data.split('\n');
        loadAboutMe(TERMINAL, ["whoami", "finger drew", "cat " + ABOUTME], text);
    }

    /*
    Loads specified terminal with about me file output.
    */
    // function loadAboutMe(terminal, command, text) {

    //     return function(data) {
    //         console.log(command);

    //         var $window = $(terminal).find(".terminal-window");

    //         // $(terminal).empty();
    //         // $(terminal).append(new prompt(command));
    //         $window.empty();
    //         $window.append(new prompt(command + " " + text));

    //         data.split('\n').forEach(function(p) {
    //             console.log(p);
    //             // $(terminal).append(new paragraph(p));
    //             $window.append(new paragraph(p));
    //         });

    //         // $(terminal).append(new prompt());
    //         $window.append(new prompt());
    //     }

    // }

    function loadAboutMe(terminal, command, text) {
        if (!outputedToConsole) {
            console.log(command);
        }

        var $window = $(terminal).find(".terminal-window");

        clearText($window, command, text);
        outputedToConsole = true;
    }

    function displayCommand($window, command, delay, callback) {
        var $prompt = new prompt();
        $window.append($prompt);
        $(function(){
            $prompt.find(".element").typed({
                // defaults
                cursorChar: "_",
                typeSpeed: 60,
                backSpeed: 30,
                backDelay: 2000,

                // user defined parameters
                strings: command,
                startDelay: delay,
                callback: callback
            });
        });
    }

    function executeCommand($window, callback) {
        // remove cursor from last command
        $window.find(".typed-cursor").remove();

        // execute callback after brief pause
        setTimeout(callback, 1000);
    }

    function displayText($window, command, text) {
        $window.find(".typed-cursor").remove();

        text.forEach(function(p) {
            if (!outputedToConsole) {
                console.log(p);
            }
            $window.append(new paragraph(p));
        });

        var clearCom   = function() { clearText( $window, command, text); }
        var executeCom = function() { executeCommand( $window, clearCom); }
        
        displayCommand($window, ["clear"], 5000, executeCom);

    }

    function clearText($window, command, text) {
        $window.empty();

        var displayCom = function() { displayText($window, command, text); }
        var executeCom = function() { executeCommand( $window, displayCom); }

        displayCommand($window, command, 3000, executeCom);
    }

    // Returns BASH prompt for which typing script can attach commands to
    function prompt() {
        var $prompt = new paragraph();
        $prompt.addClass(PROMPT_CLASS);

        $prompt.text(PROMPT_STRING);
        $prompt.append($('<span class="element"></span>'));
        
        return $prompt;
    }

    // Returns paragraph html element containing specified text
    function paragraph(text) {
        var $paragraph = $('<p></p>');
        $paragraph.text(text);
        return $paragraph;
    }

})();