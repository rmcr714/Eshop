import mongoose from 'mongoose'

const connectDB = async() => {

    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true,
            useCreateIndex:true
        })

        console.log(`MongoDb Connected : ${conn.connection.host}`.cyan)  //here .cyan and .red.underline are used to give colors to the console.logs
    }catch(error){
        console.log(`Error : ${error.message}`.red.underline.bold)
        process.exit(1)

    }
}
export default connectDB