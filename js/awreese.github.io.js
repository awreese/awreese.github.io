(function () {
    "use strict";

    var ABOUTME      = "aboutMe.txt";
    var TERMINAL     = ".terminal";
    
    var PROMPT       = "t-prompt";
    var PULSATE      = "pulsate";
    var PROMPTSTRING = "drew@github:~$ ";

    // loads webpage functions
    window.onload = function () {

        loadTerminal(ABOUTME);

    };

    function loadTerminal(dataFile) {
        console.log("cat " + dataFile);

        

        $(document).ready(function() {

            $(TERMINAL).empty();
            $(TERMINAL).append(new prompt("cat " + dataFile));

            $.get(dataFile, null, function(data) {

                // var paragraphs = data.split('\n');
                
                // for (var i = 0; i < paragraphs.length; i++) {
                //     console.log(paragraphs[i]);
                //     $(TERMINAL).append(new paragraph(paragraphs[i]));
                // }

                data.split('\n').forEach(function(p) {
                    console.log(p);
                    $(TERMINAL).append(new paragraph(p));
                });

            });

            $(TERMINAL).append(new prompt());
        });
        
    }

    function prompt(command) {
        var $prompt = $('<p></p>');
        $prompt.addClass(PROMPT);
        if (command) {
            $prompt.text(PROMPTSTRING + command);
        } else {
            $prompt.text(PROMPTSTRING);
            $prompt.append(new cursor());
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