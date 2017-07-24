"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rp = require("request-promise");
var tsmonad_1 = require("tsmonad");
var url = {
    yes: { uri: 'http://localhost:3000/yes', json: true },
    no: { uri: 'http://localhost:3000/no', json: true }
};
rp(url.yes)
    .then(function (body) { return console.log('/yes', body); });
rp(url.no)
    .then(function (body) { return console.log('/no', body); });
/* First-level dereference */
rp(url.yes)
    .then(function (body) { return console.log('/yes', body.name); });
rp(url.no)
    .then(function (body) { return console.log('/no', body.name); });
/* Mis-spelled property */
// rp(url.yes)
//     .then((body: RESTAPI) => console.log('/yes', body.firstname));
// rp(url.no)
// .then((body: RESTAPI) => console.log('/no', body.firstname));
/* Run-time exception */
rp(url.yes)
    .then(function (body) { return console.log('/yes', getFirstName(body)); });
rp(url.no)
    .then(function (body) { return console.log('/no', getFirstName(body)); });
function getFirstName(body) {
    var _body = tsmonad_1.Maybe.maybe(body);
    var hasBody = tsmonad_1.Maybe.just(_body)
        .caseOf({
        just: function (body) { return true; },
        nothing: function () { return false; }
    });
    if (!hasBody)
        return undefined;
    var _name = tsmonad_1.Maybe.maybe(body.name);
    var hasName = tsmonad_1.Maybe.just(_name)
        .caseOf({
        just: function (name) { return body.name; },
        nothing: function () { return false; }
    });
    if (!hasName)
        return undefined;
    var _firstName = tsmonad_1.Maybe.maybe(body.name.first);
    var hasFirstName = tsmonad_1.Maybe.just(_firstName)
        .caseOf({
        just: function (name) { return body.name.first; },
        nothing: function () { return false; }
    });
    if (hasFirstName)
        return body.name.first;
    return undefined;
}
