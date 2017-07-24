const app = require('express')();

app.get('/yes', (req, res) => res.json({name: { first: 'The Legendary Josh Wulf™', last: 'As Seen on the Internet®' }}));
app.get('/no', (req, res) => res.json({}));

app.listen(3000, () => console.log('Listening on port 3000'));