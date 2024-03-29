const express = require('express');

const app = express();

app.use(express.static('./dist/Projet'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/Projet'}),
);

app.listen(process.env.PORT || 8088);
