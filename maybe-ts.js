"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rp = require("request-promise");
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
rp(url.yes)
    .then(function (body) { return console.log('/yes', body.firstname); });
rp(url.no)
    .then(function (body) { return console.log('/no', body.firstname); });
/* Run-time exception */
rp(url.yes)
    .then(function (body) { return console.log('/yes', body.name.first); });
rp(url.no)
    .then(function (body) { return console.log('/no', body.name.first); });
