require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./app/admin/route/admin');
const router2 =require('./app/product/product-routes/routes')
const mongoose = require('mongoose');
const errorHandler = require('./helpers/errorhandler')

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());
app.use(errorHandler);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then( () =>{
    console.log('mongodb connected');
}).catch(error=>{
    console.log('mongodb not connected', error);
});
router(app);
router2(app)

app.listen(8500, ()=>{
    console.log('app is listening 8500');
});
