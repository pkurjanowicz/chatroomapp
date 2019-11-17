const express = require('express');
const app = express();
const http = require('http').Server(app);

app.use('/style', express.static(__dirname + '/style'))
app.get('/', (req,res) => res.sendFile(__dirname + '/dist/index.html'))

http.listen(3000, () => {
    console.log('Listing on port 3000!')
})