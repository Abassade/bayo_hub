const AdminModel = require('./model/admin');
const createAdminSchema = require('./schema/createAdmin');
const bcrypt = require('bcrypt');

class Admin {
    async createAdmin(req, res){
        try {
            // this is to validate request payload
            await createAdminSchema.validateAsync(req.body);

            const { email } = req.body;
            const admin = await AdminModel.findOne({ email }).lean();
            if(admin){
                return res.send({
                    success: false,
                    message: 'email already exists',
                });
            }
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            const newAdmin = (await AdminModel.create(req.body)).toJSON();
            delete newAdmin.password;
            return res.send({
                success: true,
                message: 'admin successfully created',
                data: newAdmin
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
    async getAllAdmin(req, res){
       try{
         const admin = await AdminModel.find(req.body)
             return res.send({
                 success: true,
                 message: 'all admin sucessfully retrieved',
                 data:admin
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
async updateAdmin(req, res){
    try{
      const {id}= req.params;
      const admin = await AdminModel.findByIdAndUpdate({_id: id}, req.body)
          return res.send({
              success: true,
              message: 'Admin identity ready for update',
              data:admin
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
}
module.exports = new Admin();
