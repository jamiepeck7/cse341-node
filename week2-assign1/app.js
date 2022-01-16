const express = require('express');

const app = express();

// app.use((req, res, next) => {
    // console.log('First');
    // next();
// });

// app.use((req, res, next) => {
    // console.log('second');
    // res.send('<p>Got it</>');
// });


app.use('/users', (req, res, next) => {
    console.log('/users middle');
    res.send('<p>This takes care of it</p>');
});

app.use('/', (req, res, next) => {
    console.log('/middle');
    res.send('<p>This takes care of it')
});






app.listen(3000);