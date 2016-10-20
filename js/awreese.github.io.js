/*
Copyright 2016 Andrew Reese, All rights reserved.
Licensed under GNU GPL (https://www.gnu.org/licenses/licenses.html).
*/

(function () {
    "use strict";

    const ABOUTME       = "aboutMe.txt";
    const TERMINAL      = "#terminal1";
    const PROMPT_STRING  = "drew@github:~$ ";

    // Script timing constants
    const TIMEOUT_EXECUTE = 4000;   //   4 seconds - wait this long after typing command before executing
    const TIMEOUT_PROCESS = 500;    // 0.5 seconds - time to show "processing"
    const TIMEOUT_COMMAND = 3000;   //   3 seconds - wait this long before typing command
    const TIMEOUT_CLEAR   = 60000;  //  60 seconds - wait this long before clearing

    var loop = true;

    var text;
    var outputedToConsole = false;
    var commands = ["whoami?", "finger drew", "cat " + ABOUTME];

    const DEBUG = false;
    
    // loads webpage functions
    window.onload = function () {

        // used when testing/debugging on local machine
        if (DEBUG) {
            text = ["paragraph1", "paragraph2", "paragraph3"];
            loadTerminal(TERMINAL, commands);
        } else {
            $.get(ABOUTME, loadData_cb, "text"); // Asynch call!
        }
        
    };

    /*
    Callback parses retrieved data into array of text paragraphs and loads terminal.
    */
    function loadData_cb(data) {
        text = data.split('\n');
        loadTerminal(TERMINAL, commands);
    }

    /*
    Loads specified terminal with specified command and text.
    */
    function loadTerminal(terminal, command) {
        var $window = $(terminal).find(".terminal-window");
        clearText_cb($window, command);
    }
    
    /*
    Executes callback function after brief timeout.
    This is to make a pause before actually entering a terminal command.
    */
    function executeCommand_cb($window, callback) {
        // execute callback function after brief pause
        setTimeout(callback, TIMEOUT_EXECUTE);
    }

    /*
    Process callback function after brief timeout.
    This is mostly for aesthetic purposes so it "appears" like the terminal actually had to "process" a command.
    */
    function processCommand_cb($window, callback) {
        // remove cursor from last command
        $window.find(".typed-cursor").remove();

        setTimeout(callback, TIMEOUT_PROCESS);
    }

    /*
    Loads specified terminal with specified command global text.
    */
    function displayText_cb($window, command) {
        if (!outputedToConsole) {
            console.log(command[command.length - 1]);
        }

        text.forEach(function(p) {
            if (!outputedToConsole) {
                console.log(p);
            }
            $window.append(new paragraph(p));
        });
        outputedToConsole = true;
        
        if (loop) {
            var clearCom   = function() { clearText_cb( $window, command); }
            // var processCom = function() { processCommand_cb($window, clearCom); }
            var executeCom = function() { processCommand_cb( $window, clearCom); }

            displayCommand($window, ["clear"], TIMEOUT_CLEAR, executeCom);
        } else {
            displayCommand($window, [""], TIMEOUT_CLEAR, $.noop);
        }

    }

    /*
    Clears specified terminal with specified command and text.
    */
    function clearText_cb($window, command) {
        $window.empty();

        var displayCom = function() { displayText_cb($window, command); }
        var processCom = function() { processCommand_cb( $window, displayCom); }
        var executeCom = function() { executeCommand_cb( $window, processCom); }

        displayCommand($window, command, TIMEOUT_COMMAND, executeCom);
    }

    /*
    Types commands to specified window and calls callback function.
    
    Uses Matt Boldt's "typed.js" script to do the heavy lifting of typing.
        source: http://www.mattboldt.com/demos/typed-js/

    */
    function displayCommand($window, command, delay, callback) {
        var $prompt = new prompt();
        $window.append($prompt);
        $(function(){
            $prompt.find(".bash-element").typed({
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

    // Returns BASH prompt for which typing script can attach commands to
    function prompt() {
        var $prompt = new paragraph();

        $prompt.text(PROMPT_STRING);
        $prompt.append($('<span class="bash-element"></span>'));
        
        return $prompt;
    }

    // Returns paragraph html element containing specified text
    function paragraph(text) {
        var $paragraph = $('<p></p>');
        $paragraph.text(text);
        return $paragraph;
    }

})();