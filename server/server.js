const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');

var app = express();
//app.set('port', process.env.PORT || 3000);
const port = process.env.PORT || 3000;
app.use(express.static('public'));
console.log(publicPath);


//app.listen(app.get('port'), () => {
app.listen(port, () => {
    console.log('Server is up on port ' + port); //app.get('port'));
});