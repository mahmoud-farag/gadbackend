import mongoose from "mongoose";


const sessionsSchcema = new mongoose.Schema({
   belongsTo: {
        type: mongoose.Types.ObjectId,// every time  a job created.... it will be assigned to the created user id 
        ref: 'Patient',
        required: [true, 'Please provide a patient'],
      },
      month:{
          type:Number,
          required:[true, 'you have to chose the month in numbers']
      },
      year:{
          type:Number,
          required:[true, 'you have to chose the year in numbers']
      },
    totalSessions:{
        type:Number,
        required:[true, 'you have to enter all session for this month']

    },
    paiedSessions:{
        type:Number,
        required:[true, 'you have to provide total paied sessions for this month']

    },
    unPaiedSessions:{
        type:Number,
        required:[true, 'you have to provide total unpaied sessions for this month']
    },
    sessionPrice:{
        type:Number,
        required:[true, 'you have to enter the session price']
    },
},  { timestamps: true }
)



const Sessions = mongoose.model('Sessions',sessionsSchcema)

export {Sessions};