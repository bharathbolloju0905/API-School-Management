const express = require('express');
const schoolController = require('./Controller/SchoolDataController.js');

const app = express();
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;

const db = require('./DB/ConnectToDb.js'); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
  res.send('Hello World!');
});

//Endpoint to add a school
app.post('/addSchool', schoolController.addSchoolData);

//Endpoint to get all schools
app.get('/getSchools', schoolController.getSchools);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});