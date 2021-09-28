const ProductModel = require('../product-model/product')
const createProductSchema = require('../product-schema/createProduct')

const AdminModel =require('../../admin/model/admin')


class Product {
    async createProduct(req, res){
        const admin = await AdminModel.findById(req.adminID);
        if(!admin){
            return res.send({
                sucess: false,
                message: 'authentication failed'
            })
        }
        if (admin.role === 'user-admin' ){
            return res.send({
                sucess: false,
                message: 'this admin does not have authentication'
            })
        }
        try{
            // this is to validate request payload

            await createProductSchema.validateAsync(req.body);
            const { name } = req.body;
            const product = await ProductModel.findOne({ name }).lean();
            if(product){
                return res.send({
                    success: false,
                    message: 'name already exists',
                });
            }
            req.body.adminID = req.adminID
            // This is to create a product
            const newProduct = (await ProductModel.create(req.body)).toJSON();
        
            return res.send({
                success: true,
                message: 'Product successfully created',
                data: newProduct
            });
        } catch (error) {
            console.log(error);
            return res.send({
                success: false,
                message: 'Internal server error',
                error,
            });
        }

        
        }
        async  getAllProduct(req, res){
            try{
                const { name, status } = req.query;
           const query = {};
           if(name) query.name = name;
           if(status) query.status = status;
            const product= await ProductModel.paginate(query, req.query)
                return res.send({
                    success: true,
                    message: 'all product sucessfully retrieved',
                    data:product
            });
            }
            catch (error) {
                console.log(error);
                return res.send({
                  success: false,
                  message: 'Internal server error',
                  error,
              });
      }
        }

        async updateProduct(req, res){
            try{
              const {id}= req.params;
              const product = await ProductModel.findByIdAndUpdate({_id: id}, req.body)
                  return res.send({
                      success: true,
                      message: 'product updated sucessfully',
                      data:product
                  });
         }
         catch (error) {
            console.log(error);
            return res.send({
              success: false,
              message: 'Internal server error',
              error,
          });
      }

    }
      async deleteProduct(req, res){
          try{
          const {id}= req.params;
          const product= await ProductModel.findByIdAndDelete({_id: id}, req.body);
          return res.send({
              sucess: true,
              message: 'product deleted sucessfully',
              data: product
          });

    }
    catch (error) {
        console.log(error);
        return res.send({
          success: false,
          message: 'Internal server error',
          error,
      });
  }
        
      }
        async updateStatus (res, req){
            try{
                const {status} = req.body;
                const {id} = req.params;
                const product = await ProductModel.findByIdAndUpdate({_id: id }, {status});
                return res.send({
                    sucess: true,
                    message: 'product status updated sucessfully',
                    data: product
                })
            }
    
        catch (error) {
            console.log(error);
            return res.send({
              success: false,
              message: 'Internal server error',
              error,
          });
      }
            
        }
    }

module.exports = new Product();
