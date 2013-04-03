function roundNumber(num) {  // Helper function
    var dec = 3;
    var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
}

// api-accelerometer
var accelerationWatch = null;
function updateAcceleration(acceleration) {
    document.getElementById('x').innerHTML = roundNumber(acceleration.x);
    document.getElementById('y').innerHTML = roundNumber(acceleration.y);
    document.getElementById('z').innerHTML = roundNumber(acceleration.z);
    document.getElementById('accel_timestamp').innerHTML = acceleration.timestamp;
}
function toggleAccel() {
    if (accelerationWatch !== null) {
        navigator.accelerometer.clearWatch(accelerationWatch);
        updateAcceleration({
            x : "",
            y : "",
            z : "",
            timestamp: ""
        });
        accelerationWatch = null;
    } else {
        var options = {};
        options.frequency = 1000;
        accelerationWatch = navigator.accelerometer.watchAcceleration(
                updateAcceleration, function(ex) {
                    alert("Accelerometer Error!");
                }, options);
    }
}

function getAccel() {
    if (accelerationWatch !== null) {
        navigator.accelerometer.clearWatch(accelerationWatch);
        updateAcceleration({
            x : "",
            y : "",
            z : "",
            timestamp: ""
        });
        accelerationWatch = null;
    }
    navigator.accelerometer.getCurrentAcceleration(
            updateAcceleration, function(ex) {
                alert("Accelerometer Error!");
            });
}