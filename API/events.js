// IMPORTANT: see device.js for document.addEventListener() for each event
var onSearchKeyDown = function() {
    console.log("searchbutton event fired");
    $('#eventOutput').html('<span id="searchbuttontext" style="color:#28b;"><code>searchbutton</code> fired</span>');
    $('#searchbuttontext').fadeOut(1500, function(){});
};
var onMenuButtonDown = function() {
    console.log("menubutton event fired");
    $('#eventOutput').html('<span id="menubuttontext" style="color:#2b8;"><code>menubutton</code> fired</span>');
    $('#menubuttontext').fadeOut(1500, function(){});
};
var onEventFired = function() {  // generic logging event handler
    console.log("an event fired");
};
// IMPORTANT: see device.js for document.addEventListener() for each event
