(function () {
    "use strict";

    var ABOUTME = "aboutMe.txt";

    // loads webpage controls
    window.onload = function () {
        // load controls
        var terminalText = document.querySelector("terminal-text");

        // openFile();
        $(document).ready(function(){
            // $("#terminal-text").load("aboutMe.txt");
            // $("#terminal-text").text("loaded");
            $.get("aboutMe.txt", null, function(data, status) {
                // alert("data: " + data);
                $("#terminal-text").text(data);
            }, "text");
        });
    };

    /*
    Ajax helper function.
    Parameters:
    functionName - function to call when response loads
    request - XMLHttpRequest being made
    */
    function ajaxRequest(functionName, request) {
        var ajax = new XMLHttpRequest();
        ajax.onload = functionName;
        ajax.open("GET", request, true);
        ajax.send();
    }

    function openFile() {
        ajaxRequest(processFile, ABOUTME);
    }

    function processFile() {
        debugEvent("processFile()", this);

        if (this.status === 200) {
            document.querySelector(terminalText).innerHTML = this.responseText;
        }
    }

    

})();