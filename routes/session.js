import express  from 'express';
import { 
    addsession,
    deletesession, 
    getAllsessions, 
    getsession, 
    updatesession,  } from '../controllers/session.js';

const sessionsRoute = express.Router();



sessionsRoute.post('/', addsession)
             .get('/', getAllsessions).get('/:id',getsession)
             .patch('/:id', updatesession)
             .delete('/:id', deletesession)
              
export {sessionsRoute}