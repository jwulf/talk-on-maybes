import * as rp from 'request-promise';

interface name {
    first: string;
    last: string;
}

interface RESTAPI {
    name: name;
}

const url = {
    yes: { uri: 'http://localhost:3000/yes', json: true },
    no: { uri: 'http://localhost:3000/no', json: true }
};

rp(url.yes)
    .then((body: RESTAPI) => console.log('/yes', body));

rp(url.no)
    .then((body: RESTAPI) => console.log('/no', body));

/* First-level dereference */

rp(url.yes)
    .then((body: RESTAPI) => console.log('/yes', body.name));

rp(url.no)
.then((body: RESTAPI) => console.log('/no', body.name));

/* Mis-spelled property */

rp(url.yes)
    .then((body: RESTAPI) => console.log('/yes', body.firstname));

rp(url.no)
.then((body: RESTAPI) => console.log('/no', body.firstname));

/* Run-time exception */

rp(url.yes)
    .then((body: RESTAPI) => console.log('/yes', body.name.first));

rp(url.no)
.then((body: RESTAPI) => console.log('/no', body.name.first));

