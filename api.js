var Order = require('./order');
const dboperations = require('./dboperations');
const router = require('./port');


// //This part is require for creating api
// var express = require('express');
// var bodyParser = require('body-parser');
// var cors = require('cors');
// var app = express();
// var router = express.Router();

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
// app.use(cors());
// app.use('/api', router);

// //create a middleware
// //this part will always call before any other route excecuted
// //so it's a place for authentication, authorization and logging
// router.use((request, response, next)=>{
//     console.log('middleware');
//     next();
// })

// //open the port
// var port = process.env.PORT || 8090;
// app.listen(port);
// console.log('Order API is running at ', port);


// let test;
//create the route which will create all the orders
router.route('/orders').get((request, response)=>{
    dboperations.getOrders().then(result => {
        console.log(result[0].length);
        response.json(result[0]);
        // test = response.json(result[0]);
    })
})

router.route('/orders/:id').get((request, response)=>{
    dboperations.getOrder(request.params.id).then(result => {
        response.json(result[0]);
    })
})

router.route('/orders').post((request, response)=>{
    let order = {...request.body}

    dboperations.addOrder('Orders',order).then(result => {
        ///status that orders created
        console.log("####");
        response.status(201).json(result);
    })
})

router.route('/updateorders').post((request, response)=>{
    let order = {...request.body}

    dboperations.updateOne('Orders',order).then(result => {
        ///status that orders created
        response.status(201).json(result);
    })
})

// //open the port
// var port = process.env.PORT || 8090;
// app.listen(port);
// console.log('Order API is running at ', port);

// dboperations.getOrders().then(result => {
//     console.log(result);
// })