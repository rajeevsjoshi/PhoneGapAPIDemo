var getCurrentPosition = function() {
    var success = function(pos) {                
        var text = "<div>Latitude: " + pos.coords.latitude + 
                    "<br/>" + "Longitude: " + pos.coords.longitude + "<br/>" + 
                    "Accuracy: " + pos.coords.accuracy + "m<br/>" + "</div>";
        $("#cur_position").html(text);
        console.log(text);
        
        var mapwidth = parseInt($('#map').css("width"), 10);  // remove 'px' from width value
        var mapheight = parseInt($('#map').css("height"), 10);
        $('#map').css('visibility','visible');
        $('#map').attr('src', "http://maps.googleapis.com/maps/api/staticmap?center=" + 
            pos.coords.latitude + "," + pos.coords.longitude + 
            "&zoom=13&size=" + mapwidth + "x" + mapheight + "&maptype=roadmap&markers=color:green%7C" +
            pos.coords.latitude + "," + pos.coords.longitude + "&sensor=false");
    };
    var fail = function(error) {
        $("#cur_position").html("Error getting geolocation: " + error.code);
        console.log("Error getting geolocation: code=" + error.code + " message=" + error.message);
    };

    $('#map').css('visibility','hidden');
    $("#cur_position").html("Getting geolocation . . .");
    console.log("Getting geolocation . . .");
    navigator.geolocation.getCurrentPosition(success, fail);
};

// api-geolocation Watch Position
var watchID = null;
function clearWatch() {
    if (watchID !== null) {
        navigator.geolocation.clearWatch(watchID);
        watchID = null;
        $("#cur_position").empty();
        $('#map').css('visibility','hidden');
    }
}
var wsuccess = function(pos) {                
    $("#cur_position").html("Watching geolocation . . .");
    $('#map').css('visibility','hidden');
    var text = "<div>Latitude: " + pos.coords.latitude + 
                " (watching)<br/>" + "Longitude: " + pos.coords.longitude + "<br/>" + 
                "Accuracy: " + pos.coords.accuracy + "m<br/>" + "</div>";
    $("#cur_position").html(text);
    console.log(text);    
    var mapwidth = parseInt($('#map').css("width"), 10);  // remove 'px' from width value
    var mapheight = parseInt($('#map').css("height"), 10);
    $('#map').css('visibility','visible');
    $('#map').attr('src', "http://maps.googleapis.com/maps/api/staticmap?center=" + 
        pos.coords.latitude + "," + pos.coords.longitude + 
        "&zoom=13&size=" + mapwidth + "x" + mapheight + "&maptype=roadmap&markers=color:green%7C" +
        pos.coords.latitude + "," + pos.coords.longitude + "&sensor=false");
};
var wfail = function(error) {
    $("#cur_position").html("Error getting geolocation: " + error.code);
    console.log("Error getting geolocation: code=" + error.code + " message=" + error.message);
};
var toggleWatchPosition = function() {
    if (watchID) {
        console.log("Stopped watching position");
        clearWatch();  // sets watchID = null;
    } else {
        //$("#cur_position").empty();
        $('#map').css('visibility','hidden');
        $("#cur_position").html("Watching geolocation . . .");
        console.log("Watching geolocation . . .");
        var options = { frequency: 3000, maximumAge: 5000, timeout: 5000, enableHighAccuracy: true };
        watchID = navigator.geolocation.watchPosition(wsuccess, wfail, options);
    }
};
