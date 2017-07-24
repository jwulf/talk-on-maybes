import * as rp from 'request-promise';
import {Maybe} from 'tsmonad';

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

// rp(url.yes)
//     .then((body: RESTAPI) => console.log('/yes', body.firstname));

// rp(url.no)
// .then((body: RESTAPI) => console.log('/no', body.firstname));

/* Run-time exception */

rp(url.yes)
    .then((body: RESTAPI) => console.log('/yes', getFirstName(body)));

rp(url.no)
.then((body:RESTAPI) => console.log('/no', getFirstName(body))
);





function getFirstName(body) {
    const _body = Maybe.maybe(body);

    const hasBody = Maybe.just(_body)
        .caseOf({
            just: body => true,
            nothing: () => false
        });

    if (!hasBody) return undefined;

    const _name = Maybe.maybe(body.name);

    const hasName = Maybe.just(_name)
        .caseOf({
            just: name => body.name,
            nothing: () => false
        });

    if (!hasName) return undefined;

    const _firstName = Maybe.maybe(body.name.first);

    const hasFirstName = Maybe.just(_firstName)
        .caseOf({
            just: name => body.name.first,
            nothing: () => false
        });

    if (hasFirstName) return body.name.first;

    return undefined;
}