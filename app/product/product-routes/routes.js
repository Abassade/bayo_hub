const productController = require('../product-controller/controller')
const auth = require('../middleware/auth')
const product = (app)=>{
    app.get('/', (req, res)=>{
        console.log('[x] product base endpoint called...');
        res.status(200).send({
            success: true,
            message: 'Welcome to Aggregator portal',
        });
    });

    app.post('/createProduct', auth,(req, res)=>{
        console.log('[x] createProduct endpoint called...');
        productController.createProduct(req, res)
    });
    app.put('/updateProduct/:id', auth,(req, res)=>{
        console.log('[x] updateProduct endpoint called...');
        productController.updateProduct(req, res)        
    });
    app.get('/getAllProduct', (req, res)=>{
        console.log('[x] getallProduct endpoint called...');
        productController.getAllProduct(req, res)
    });
    app.delete('/deleteProduct/:id', auth,(req, res)=>{
        console.log('[x] deleteProduct endpoint called...');
        productController.deleteProduct(req, res)
    });
    app.put('/statusCheck/:id', auth,(req, res)=>{
        console.log('[x] statuscheck endpoint called...');
        productController.updateStatus(res, req)

    })
}

module.exports = product;