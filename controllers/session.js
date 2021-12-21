import { Sessions } from "./SessionModel.js";
import httpStatusCodes from 'http-status-codes';

const {StatusCodes} = httpStatusCodes


const addsession = async(req, res)=>{

      try {
         const  sessionAddedd = await  Sessions.create(req.body)
         if(!sessionAddedd)
           throw new Error('session not addded to DB');
        
          res.status(StatusCodes.OK).send(sessionAddedd);
      } catch (error) {
       res.status(StatusCodes.INTERNAL_SERVER_ERROR	).send(error.message)
    }

    // res.send('add session ')
}   

const getAllsessions = async(req,res)=>{
    try {
        const allsessions =await  Sessions.find({});
       
        if(allsessions.length ===0)
         throw new Error('no sessions founded');

        res.status(StatusCodes.OK).send(allsessions);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    } 

    // res.send('all sessions')
}

const getsession =async(req, res)=>{
           
       if(!req.params.id)
       return res.status(StatusCodes.BAD_REQUEST).send('please provide an id')
   try {
       const session = await Sessions.findById(req.params.id)
         if(!session)
         throw new Error('no session found incorrect id')

         res.status(StatusCodes.OK).send(session)
   } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
   }
}

const updatesession = async (req, res)=>{

            if(!req.params.id)
            return res.status(402).send('please provide an id');

    //   const session ={}
    //      if(req.body.name)
    //        session.name = req.body.name;
    //      if(req.body.clinik)
    //        session.clinik = req.body.clinik;
    try{
       const updatedsession = await Sessions.findOneAndUpdate(
                          {_id:req.params.id, belongsTo:req.body.belongsTo},
                          req.body,
                          { new: true, runValidators: true })
          if(!updatedsession){
             throw new Error(`no session found to be updated`)
          }                
      res.status(StatusCodes.OK).send(updatedsession);
   
    }catch(error){
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message)
    }
}
 
const deletesession = async(req, res)=>{

    try {
        const deletedsession =  await Sessions.findByIdAndRemove({_id:req.params.id});
        if(!deletedsession){
            throw new Error(`no session found to be delete for this id: ${req.params.id}`)
        }   
        res.status(StatusCodes.OK).send({deletedItem:deletedsession, deletedSuccessfully:true});
  }catch(error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message)
  }}

export {
    addsession,
    getAllsessions,
    getsession,
    updatesession,
    deletesession
}