var GLOBAL_RECURSION_LEVEL = 3;

window.onkeypress = function(evt) {
    var key = evt.which ? evt.which : evt.keyCode;
    var c = String.fromCharCode(key);
    var keyCode = evt.keyCode;

    // Change recursion level.
    switch(keyCode) {
        case(43):
            // +
            if (GLOBAL_RECURSION_LEVEL < 5) {
                GLOBAL_RECURSION_LEVEL++;
                app.start();
            }
            break;
        case(45):
            // -
            if (GLOBAL_RECURSION_LEVEL > 0) {
                GLOBAL_RECURSION_LEVEL--;
                app.start();
            }
            break;
    }
}
