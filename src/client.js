const rp = require('request-promise');

const url = {
    yes: { uri: 'http://localhost:3000/yes', json: true },
    no: { uri: 'http://localhost:3000/no', json: true }
};

rp(url.yes)
    .then(body => console.log('/yes', body));

rp(url.no)
    .then(body => console.log('/no', body));

/* First-level dereference */

rp(url.yes)
    .then(body => console.log('/yes', body.name));

rp(url.no)
.then(body => console.log('/no', body.name));

/* Mis-spelled property */

rp(url.yes)
    .then(body => console.log('/yes', body.firstname));

rp(url.no)
.then(body => console.log('/no', body.firstname));

/* Run-time exception */

rp(url.yes)
    .then(body => console.log('/yes', body.name.first));

rp(url.no)
.then(body => console.log('/no', body.name.first));

