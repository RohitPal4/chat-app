import mongoose from 'mongoose'

export const connectDB = async(req , res)=>{
    try {
        const conn = await mongoose.connect(process.env.DB_URL);
        console.log(`mongoDB connected succesfully ${conn.connection.host}`)
    } catch (error) {
        console.log("mongodb connection error: ", error)
    }
}