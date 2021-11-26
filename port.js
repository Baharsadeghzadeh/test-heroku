//This part is require for creating api
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

//create a middleware
//this part will always call before any other route excecuted
//so it's a place for authentication, authorization and logging
router.use((request, response, next)=>{
    console.log('middleware');
    next();
})

//open the port
var port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is running at ', port);

module.exports = router;