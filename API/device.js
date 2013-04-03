function onBackbutton() {
    // the intro div is considered home, so exit if use
    // wants to go back with button from there
    if ($('.api-div#api-intro').css('display') === 'block') {
        console.log("Exiting app");
        navigator.app.exitApp();
    } else {    
        $('.api-div').hide();
        $('.api-div#api-intro').show();
        $.mobile.silentScroll(0);
    }
}
var onDeviceReady = function() {
    console.log("deviceready event fired");
    // api-device
    // ***IMPORTANT: access device object only AFTER "deviceready" event    
    document.getElementById("name").innerHTML = device.name;
    document.getElementById("pgversion").innerHTML = device.cordova ? device.cordova : device.phonegap;
    document.getElementById("platform").innerHTML = device.platform;
    document.getElementById("uuid").innerHTML = device.uuid;
    document.getElementById("version").innerHTML = device.version;
    // screen information  ***Not necessary to wait for deviceready event
    document.getElementById("width").innerHTML = screen.width;
    document.getElementById("height").innerHTML = screen.height;
    document.getElementById("availwidth").innerHTML = screen.availWidth;
    document.getElementById("availheight").innerHTML = screen.availHeight;
    document.getElementById("colorDepth").innerHTML = screen.colorDepth;  
    
    // api-events - see events.js for handler implementations
    // ***IMPORTANT: add event listeners only AFTER "deviceready" event    
    document.addEventListener("searchbutton", onSearchKeyDown, false);   
    document.addEventListener("menubutton", onMenuButtonDown, false);
    document.addEventListener("pause", onEventFired, false);
    document.addEventListener("resume", onEventFired, false);
    document.addEventListener("online", onEventFired, false);
    document.addEventListener("offline", onEventFired, false);
    // using callback for backbutton event may interfere with normal behavior
    document.addEventListener("backbutton", onBackbutton, false);
    document.addEventListener("batterycritical", onEventFired, false);
    document.addEventListener("batterylow", onEventFired, false);
    document.addEventListener("batterystatus", onEventFired, false);
    document.addEventListener("startcallbutton", onEventFired, false);
    document.addEventListener("endcallbutton", onEventFired, false);
    document.addEventListener("volumedownbutton", onEventFired, false);
    document.addEventListener("volumeupbutton", onEventFired, false);
    
    // api-camera  Photo URI
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
       
    // The Samsung Galaxy Tab 10.1 is currently the only device known to
    // support orientation/change correctly and reliably.
    if (device.name === "GT-P7510") {
        var updateScreen = function() {
            document.getElementById("width").innerHTML = screen.width;
            document.getElementById("height").innerHTML = screen.height;
            document.getElementById("availwidth").innerHTML = screen.availWidth;
            document.getElementById("availheight").innerHTML = screen.availHeight;        
        };         
        window.addEventListener("orientationchange", function(e){
            //console.log("window.orientation: " + window.orientation);
            updateScreen();
        }, false);
    }
};

function init() {
    document.addEventListener("deviceready", onDeviceReady, true);
}
