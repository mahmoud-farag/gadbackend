import { Patient } from "./patientModel.js";
import httpStatusCodes from 'http-status-codes';
import { getTotalUnpaied } from "../config/getTotalUnpaied.js";

const {StatusCodes} = httpStatusCodes


const addPatient = async(req, res)=>{

      try {
            // console.log(req.body)
         const  patientAddedd = await  Patient.create(req.body)
         if(!patientAddedd)
           throw new Error('patient not addded to DB');
        //    console.log(patientAddedd)
          res.status(StatusCodes.OK).send(patientAddedd);
      } catch (error) {
       res.status(StatusCodes.INTERNAL_SERVER_ERROR	).send(error.message)
    }
}   

const getAllPatients = async(req,res)=>{
     const{clinik} =  req.query,
          queryObject={};

        let  totalUnpaied=0

    try { 
       if(clinik){
        queryObject.clinik = clinik;
        // console.log(queryObject)
       }
        const allPatients =await Patient.find(queryObject);
           
        if(allPatients.length ===0)
        // res.status(201).send({allPatients:[],message:'no patients to display'})
         throw new Error('no Patients founded');

         totalUnpaied= getTotalUnpaied(allPatients)
        //   console.log(totalUnpaied)
        res.status(StatusCodes.OK).send({allPatients, totalUnpaied});
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
      } 
}

const getPatient =async(req, res)=>{
           
       if(!req.params.id)
       return res.status(StatusCodes.BAD_REQUEST).send('please provide an id')
   try {
       const patient = await Patient.findById(req.params.id)
         if(!patient)
         throw new Error('no patient found incorrect id')
       
         res.status(StatusCodes.OK).send({patient})
   } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
   }
}

const updatePatient = async (req, res)=>{

            if(!req.params.id)
            return res.status(402).send('please provide an id');
      const patient ={}
         if(req.body.name)
           patient.name = req.body.name;
         if(req.body.clinik)
           patient.clinik = req.body.clinik;
    try{
       const updatedPatient = await Patient.findOneAndUpdate(
                          {_id:req.params.id},
                          req.body,
                          { new: true, runValidators: true })
          if(!updatedPatient){
              res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`no patient found to be updated`)
          }                
      res.status(StatusCodes.OK).send(updatedPatient);
   
    }catch(error){
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message)
    }
}
 
const deletePatient = async(req, res)=>{

    try {
       
        const deletedPatient =  await Patient.findByIdAndRemove({_id:req.params.id});
        if(!deletedPatient){
            throw new Error(`no patient found to be delete for this id: ${req.params.id}`)
        }   
        res.status(StatusCodes.OK).send({deletedItem:deletedPatient, deletedSuccessfully:true});
  }catch(error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message)
  }}

export {
    addPatient,
    getAllPatients,
    getPatient,
    updatePatient,
    deletePatient


}