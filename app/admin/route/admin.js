const adminController = require('../controller');

const admin = (app)=>{
    app.get('/', (req, res)=>{
        console.log('[x] Admin base endpoint called...');
        res.status(200).send({
            success: true,
            message: 'Welcome to Aggregator portal',
        });
    });

    app.post('/createAdmin', (req, res)=>{
        console.log('[x] createAdmin endpoint called...');
        adminController.createAdmin(req, res)
    });
      
}

module.exports = admin;