var text = "JOHN0000MICHAEL0009994567";

var parsed = {
    firstName: "",
    lastName: "",
    clientId: ""
}
var temp = [];
var foundsplit = false;
var splitend = false;
for (var a = 0; a < text.length; a++) {
    if (text[a + 1] == '0' || typeof text[a + 1] === 'undefined') {
        //temp.push(text[a]);
        foundsplit = true;
    }
    temp.push(text[a]);
    if (foundsplit && (text[a + 1] !== '0' || typeof text[a + 1] === 'undefined')) {
        foundsplit = false;
        splitend = true;
    }
    if (!foundsplit && splitend) {
        if (!parsed.firstName) {
            parsed.firstName = temp.join('');
        } else if (!parsed.lastName) {
            parsed.lastName = temp.join('');
        } else if (!parsed.clientId) {
            parsed.clientId = temp.join('');
        }
        temp = [];
        foundsplit = false;
        splitend = false;
    }
}
console.log(parsed);