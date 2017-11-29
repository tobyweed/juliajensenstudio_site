$(document).ready(function() {
    //function to show and hide text edit forms on info pages.
    function show(a, name) {
        //show or hide the form, and switch the text to accurately respresent that process
        $("#" + name).toggle();
        var btnstate = $("#" + name + "btn").html();
        if (btnstate === "Edit") {
            $("#" + name + "btn").html("Hide");
        }
        else {
            $("#" + name + "btn").html("Edit");
        }
    }
});