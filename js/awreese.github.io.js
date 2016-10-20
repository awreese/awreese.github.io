/*
Copyright 2016 Andrew Reese, All rights reserved.
Licensed under GNU GPL (https://www.gnu.org/licenses/licenses.html).
*/

(function () {
    "use strict";

    const ABOUTME       = "aboutMe.txt";
    const TERMINAL      = "#terminal1";
    
    const PROMPT_CLASS  = "t-prompt";
    const PROMPT_STRING  = "drew@github:~$ ";

    const TIMEOUT_EXECUTE = 500;    // 0.5 seconds
    const TIMEOUT_COMMAND = 30000;  //  30 seconds
    const TIMEOUT_CLEAR   = 3000;   //   3 seconds

    var text;
    var outputedToConsole = false;

    const DEBUG = false;
    
    // loads webpage functions
    window.onload = function () {

        // used when testing/debugging on local machine
        if (DEBUG) {
            text = ["paragraph1", "paragraph2", "paragraph3"];
            loadAboutMe(TERMINAL, ["whoami", "finger drew", "cat " + ABOUTME], text);
        } else {
            $.get(ABOUTME, loadData, "text"); // Asynch call!
        }
        
    };

    function loadData(data) {
        text = data.split('\n');
        loadAboutMe(TERMINAL, ["whoami", "finger drew", "cat " + ABOUTME], text);
    }

    /*
    Loads specified terminal with about me file output.
    */
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
        setTimeout(callback, TIMEOUT_EXECUTE);
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
        
        displayCommand($window, ["clear"], TIMEOUT_COMMAND, executeCom);

    }

    function clearText($window, command, text) {
        $window.empty();

        var displayCom = function() { displayText($window, command, text); }
        var executeCom = function() { executeCommand( $window, displayCom); }

        displayCommand($window, command, TIMEOUT_CLEAR, executeCom);
    }

    // Returns BASH prompt for which typing script can attach commands to
    function prompt() {
        var $prompt = new paragraph();

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