const AdminModel = require('./model/admin');
const createAdminSchema = require('./schema/createAdmin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
           const { first_name, role } = req.query;
           const query = {};
           if(first_name) query.first_name = first_name;
           if(role) query.role = role;
            const admin = await AdminModel.paginate(query, req.query)
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
   async loginAdmin(req, res) {
       try{
    const {email, password} = req.body;
    const admin = await AdminModel.findOne({ email });
    if (admin && bcrypt.compareSync(password, admin.password)) {
        const token = jwt.sign({ admin: admin._id }, 'somesecret', { expiresIn: '7d' });
    if(!admin){
        return res.send({
            success: false,
            message: 'email does not exists'
        }); 
    }        
    return res.send({
        success: true,
        message: 'admin successfully login',
        data: admin,
        token
    })
    
  }
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
