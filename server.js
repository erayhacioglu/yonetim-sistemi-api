require('./config/dbConnection')();
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const CookieParser = require('cookie-parser');

const app = express();

//middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(CookieParser());

//routers
app.use('/api/clinic', require('./routers/clinicRouter'));
app.use('/api/clinicTreatment', require('./routers/clinicTreatmentRouter'));
app.use('/api/patient', require('./routers/patientRouter'));
app.use('/api/personal', require('./routers/personalRouter'));
app.use('/api/prescription', require('./routers/patientPrescriptionRouter'));
app.use('/api/patientTreatment', require('./routers/patientTreatmentRouter'));
app.use('/api/appointment', require('./routers/appointmentRouter'));
app.use('/api/note', require('./routers/patientNoteRouter'));

//app listening and port setting
const Port = process.env.PORT || 5000;
app.listen(Port, () => console.log(`Server running on Port : ${Port}`));
