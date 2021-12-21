import express  from 'express';
import { 
    addPatient,
    deletePatient, 
    getAllPatients, 
    getPatient, 
    updatePatient,  } from '../controllers/patient.js';

const patientRoute = express.Router();

patientRoute.post('/', addPatient)
             .get('/', getAllPatients).get('/:id',getPatient)
             .patch('/:id', updatePatient)
             .delete('/:id', deletePatient)
              
export {patientRoute}