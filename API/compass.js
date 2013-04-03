var compassWatch = null;

function updateHeading(h) {
    $('#heading').html(h.magneticHeading);
}
function compassError(error) {
    alert('Compass Error: ' + error.code);
    $('#heading').html("Error");
}
function toggleCompass() {
    if (compassWatch !== null) {
        navigator.compass.clearWatch(compassWatch);
        compassWatch = null;
        updateHeading({ magneticHeading : ""});
    } else { 
        // Compass Options: Android: filter is not supported
        var options = { frequency: 1000 };
        compassWatch = navigator.compass.watchHeading(
                updateHeading, compassError, options);
    }
}
function getCurrentHeading() {
    if (compassWatch !== null) {
        navigator.compass.clearWatch(compassWatch);
        compassWatch = null;
        updateHeading({ magneticHeading : ""});
    }
    navigator.compass.getCurrentHeading(updateHeading, compassError);
}