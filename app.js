require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./app/admin/route/admin');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());
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

app.listen(8000, ()=>{
    console.log('app is listening 8000');
});
