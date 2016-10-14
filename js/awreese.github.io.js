(function () {
    "use strict";

    var ABOUTME      = "aboutMe.txt";
    var TERMINAL     = ".terminal";
    
    var PROMPT       = "t-prompt";
    var PULSATE      = "pulsate";
    var PROMPTSTRING = "drew@github:~$ ";

    // loads webpage functions
    window.onload = function () {

        // loadTerminal(ABOUTME);
        $.get(ABOUTME, loadTerminal(ABOUTME), "text"); // Asynch call!

    };

    function loadTerminal(dataFile) {

        return function(data) {
            console.log("cat " + dataFile);

            $(TERMINAL).empty();
            $(TERMINAL).append(prompt("cat " + dataFile));

            // $(document).ready(function() {
                // $.get(dataFile, function(data) {

                    // var paragraphs = this.split('\n');
                    
                    // for (var i = 0; i < paragraphs.length; i++) {
                    //     console.log(paragraphs[i]);
                    //     $(TERMINAL).append(paragraph(paragraphs[i]));
                    // }

                    data.split('\n').forEach(function(p) {
                        console.log(p);
                        $(TERMINAL).append(new paragraph(p));
                    });

                // });
            // });

            $(TERMINAL).append(prompt());
        }

    }

    function prompt(command) {
        var $prompt = $('<p></p>');
        $prompt.addClass(PROMPT);
        if (command) {
            $prompt.text(PROMPTSTRING + command);
        } else {
            $prompt.text(PROMPTSTRING);
            $prompt.append(cursor());
        }
        return $prompt;
    }

    function cursor() {
        var $cursor = $('<span></span>');
        $cursor.addClass(PULSATE);
        $cursor.text('_');
        return $cursor;
    }

    function paragraph(text) {
        var $paragraph = $('<p></p>');
        $paragraph.text(text);
        return $paragraph;
    }

})();