const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '/dist/Todos')));
app.listen(process.env.PORT || 8080);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/Todos/index.html'));
});
console.log('Console listening!');
