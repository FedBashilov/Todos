const express = require('express');
const path = require('path');


const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
/*

const cors = require('cors');
const whitelist = ['https://rocky-caverns-04393.herokuapp.com', 'https://todos-and-projects-angular.herokuapp.com']; // allow domain

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) {
            return callback(null, true);
        }

        if (whitelist.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}

app.use(cors(corsOptions));
*/
app.use(express.static(path.join(__dirname, '/dist/Todos')));
app.listen(process.env.PORT || 8080);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/Todos/index.html'));
});
console.log('Console listening!');
