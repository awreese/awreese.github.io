(function () {
    "use strict";

    var ABOUTME = "aboutMe.txt";

    // loads webpage controls
    window.onload = function () {

        loadText();

        // $(document).ready(function(){
        //     $.get("aboutMe.txt", null, function(data, status) {
        //         $("#terminal-text").empty();

        //         var lines = data.split('\n');

        //         for (var i = 0; i < lines.length; i++) {
        //             $("#terminal-text").append("<p>" + lines[i] + "</p>");
        //         }

        //     }, "text");
        // });
    };

    function loadText() {
        $(document).ready(function(){
            $.get("aboutMe.txt", null, function(data, status) {
                $("#terminal-text").empty();

                var lines = data.split('\n');

                for (var i = 0; i < lines.length; i++) {
                    $("#terminal-text").append("<p>" + lines[i] + "</p>");
                }

            }, "text");
        });
    }

})();