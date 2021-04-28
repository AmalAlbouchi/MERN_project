const express = require('express')

const ConsultationController = require('./controllers/ConsultationController')
const UserController = require('./controllers/UserController')

const routes = express.Router();

routes.post('/Consultation', ConsultationController.createConsultation)
routes.get('/Consultation', ConsultationController.getAllConsultations)
routes.delete('/Consultation/:consultationId', ConsultationController.delete)
routes.patch('/Consultation/:id', ConsultationController.updateConsultation);
routes.get('/Consultation/:consultationId', ConsultationController.getConsultationById);


routes.post('/user/register', UserController.creerUser)
routes.post('/login', UserController.login)

module.exports = routes;