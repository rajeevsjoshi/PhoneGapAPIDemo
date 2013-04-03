function contacts_success(contacts) {
    $('#contacts-output').html("<strong>" + contacts.length + "</strong> contacts returned.");
    for (var i = 0; i < contacts.length ; i++) {        
        if (contacts[i].name && contacts[i].name.formatted) {
            $('#contacts-output').append("<br/>Contact " + (i+1) + " is <strong>" +
                    contacts[i].name.formatted + "</strong>");
            break;
        }
    }
}
function contacts_fail (error) {
    $('#contacts-output').html("<strong>Error getting contacts.</strong>");
}
function get_contacts() {
    var obj = new ContactFindOptions();
    obj.filter = "";
    obj.multiple = true;
    navigator.contacts.find(
            [ "displayName", "name" ], contacts_success,
            contacts_fail, obj);
}

