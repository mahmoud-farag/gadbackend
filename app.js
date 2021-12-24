
import express from 'express';
import dotEnv from 'dotenv';
import cors  from 'cors'; 
import { appStart } from './meddelwares/appStart.js';
import { patientRoute } from './routes/patient.js';
import { sessionsRoute } from './routes/session.js';

// extra security packages
import helmet from 'helmet';
import  xss from 'xss-clean';
import  rateLimit from 'express-rate-limit';


const app = express(),
      port = process.env.PORT || 4000;

      // if (process.env.NODE_ENV !== "production") {
      //   dotEnv.config();
      // }
// app security modules 
app.set('trust proxy', 1);
app.use(
    rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

// middleware

      dotEnv.config()
app.use(express.json());
app.use(cors())
app.get('/', (req, res)=>{

    res.send('<h1> Your API is ready for fireworks</h1>')
})

app.use('/api/v1/patient', patientRoute);
app.use('/api/v1/session', sessionsRoute);

// app.listen(port,async (error)=>{
  
//   try {
//     if(error)
//      throw new Error(error.message)
//     await connectDB(process.env.MONGODB_URI);
//     console.log(`your server is up on ${port}`)
//   } catch (error) {
//     console.log(error.message)
//   }  
 
// })


appStart(app, port)