import { connectDB } from "../config/connectToDB.js";



export const appStart = async(app, port)=>{
  

    try {
         // db connect 
        
      await connectDB(process.env.MONGODB_URI);
      app.listen(port, ()=>console.log(`your server is up on ${port}`))
    } catch (error) {
    console.log(error.message);
    }
     
}