import mongoose from "mongoose";



const patientSchema = new mongoose.Schema({
 name:{
     type:String,
     required:[true, 'you have to provide a name'],
     trim:true
 },
 clinik:{
     type:String,
     required:[true,'you have to Enter the clink name']
 },
//  month:{
//     type:Number,
//     required:[true, 'you have to chose the month in numbers']
// },
// year:{
//     type:Number,
//     required:[true, 'you have to chose the year in numbers']
// },
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
}
},{ timestamps: true })


const Patient = mongoose.model('Patient',patientSchema)

export {Patient};