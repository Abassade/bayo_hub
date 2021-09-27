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
    app.post('/loginAdmin', (req, res)=>{
        console.log('[x] loginAdmin endpoint called...');
        adminController.loginAdmin(req, res)
    });

    app.put('/updateAdmin/:id', (req, res)=>{
        console.log('[x] updateAdmin endpoint called...');
        adminController.updateAdmin(req, res)        
    });
    app.get('/getAllAdmin', (req, res)=>{
        console.log('[x] getallAdmin endpoint called...');
        adminController.getAllAdmin(req, res)
    });
}

module.exports = admin;