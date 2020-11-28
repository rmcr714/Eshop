import bcrypt from 'bcryptjs'

const users = [
    {
        name : "Admin User",
        email:"admin@example.com",
        password:bcrypt.hashSync('123456',10), //using bcryptjs for hashing the passwords
        isAdmin : true
    },
    {
        name : "john Doe",
        email:"john@example.com",
        password:bcrypt.hashSync('123456',10),
       
    },
    {
        name : "jane Doe",
        email:"jane@example.com",
        password:bcrypt.hashSync('123456',10),
      
    }
]

export default users