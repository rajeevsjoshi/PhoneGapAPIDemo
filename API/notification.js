// api-notification
var showAlert = function() {
    function alertDismissed() {
        console.log("Alert dismissed");
    }
    navigator.notification.alert(
        'You are the winner!',  // message
        alertDismissed,         // callback
        'Game Over',            // title
        'Done'                  // buttonName
    );    
};
var showConfirm = function() {
    function onConfirm(button) {
        alert('You selected button ' + button);
    }
    navigator.notification.confirm(
            'You are the winner!',  // message
            onConfirm,              // callback to invoke with index of button pressed
            'Game Over',            // title
            'Restart,Exit'          // buttonLabels
        );    
};

//iOS Quirk - Ignores duration and plays beep.wav which must be located in the www folder.
var beep = function() {
    navigator.notification.beep(2);
};

var vibrate = function() {
    navigator.notification.vibrate(2000);
};
