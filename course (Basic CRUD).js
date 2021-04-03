// Importing mongoose
const mongoose = require('mongoose');

//Connecting to Database ('mongodb://port/databaseName')
const connect = () => {
    return mongoose.connect('mongodb://localhost:27017/database');
}

// Creating the Schemas and Model
//Schema
const student = new mongoose.Schema({
    firstName: String
})
//Model (lowercase name and singular, it's going to be plural once created)
const Student = mongoose.model('student', student)

//We connect to the database
connect()
    .then(async connection => {//Then once connected we declare what we want to do
        // We create a new student by pasing an object to the model we've created
        const student = await Student.create({firstName: 'Joshua'});
        //Basic Queries
        const found = await Student.find({firstName: 'Joshua'}) // Return the full object that contains Joshua as firstName
        const foundById = await Student.findById('.......') // Return the full object with the ID matching
        const updated = await Student.findByIdAndUpdate('....id.....', {firstName: 'Louna'}) // Update the student with the matching id and update the firstName
        console.log(student);
    })
    .catch(e => console.log(e));