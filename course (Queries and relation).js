// Importing mongoose
const mongoose = require('mongoose');

//Connecting to Database ('mongodb://port/databaseName')
const connect = () => {
    return mongoose.connect('mongodb://localhost:27017/database');
}

// Creating the Schemas and Model
//Schema
const student = new mongoose.Schema({
    firstName: String,
    lastName: String,
    info: {
        age: Number,
        nationality: String
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'school'
    }
})

const school = new mongoose.Schema({
    name: String,
    openSince: Number,
    studentsNumber: Number,
    isGreat: Boolean,
    staff: Array
})

//Model (lowercase name and singular, it's going to be plural once created)
const Student = mongoose.model('student', student);
const School = mongoose.model('school', school);

//We connect to the database
connect()//Then once connected we declare what we want to do
    .then(async connection => {

        
        //----------------
        //RELATIONS
        //----------------

        // const school = await School.create({name: 'Arlette Guirado'}) // We create a new School
        // const student = await Student.create({firstName: 'Joshua', school: school._id}); // We create a user with the firstName and the school id o link them

        // const match = await Student.findById(student.id) // Query to join school and Student
        //     .populate('school')
        //     .exec()
        // console.log(match);


        //------------------
        //FIND AN ELEMENT OR CREATE ONE
        //------------------

        // const school = await School.findOneAndUpdate( //We look for an element and if exist we update it, if not we create it
        //     {name: 'Arlette Guirado'}, // Element we look for
        //     {name: 'Arlette Guirado'}, // New Element
        //     {upsert: true, new: true}, // We specify upsert to create a new element if don't exist and we ask to return the updated object with (new)
        // ).exec() // We exec the query


        //------------------
        //QUERY
        //------------------

        // We declare two new school
        // const schoolOne = {
        //     name: 'Léopold Dussaigne',
        //     openSince: 1994,
        //     studentsNumber: 400,
        //     isGreat: false
        // }
        // const schoolTwo = {
        //     name: 'IEF-CTF',
        //     openSince: 2000,
        //     studentsNumber:1500,
        //     isGreat: true
        // }  
        // const schools = await School.create([schoolOne, schoolTwo]); // We create the two new school
        // const match = await School.findOne({
        //     studentsNumber: {$gt: 400}, // We want the school with the studentsNumber greter than 400
        //     isGreat: true // We want a great school
        // })
        //.exec(); 

        // console.log(match) // We should get back IEF-CTF

        //--------------
        //SEARCH IN ARRAYS 
        //--------------

        const schoolOne = {
            name: 'Studi',
            openSince:2006,
            studentsNumber: 10000,
            isGreat: false,
            staff: ['Jacque','Marguerite','Blanchard']
        }
        const schoolTwo = {
            name: 'Front-end Masters',
            openSince: 2010,
            studentsNumber:20,
            isGreat: true,
            staff: ['Mark','Tony','Blanchard']
        }  
        const schools = await School.create([schoolOne, schoolTwo]); // We create the two new school
        const match = await School.find({
            staff: 'Blanchard' // We look for the schools with Blanchard as a teacher
            // we can also do -> $in: {teachers: ['Jacque','Marguerite','Blanchard']} to search mutiples element
        })
        .limit(2) // We only want two elements. We can also sort with .sort(...argument...)
        .exec(); 

        console.log(match)
    })
    .catch(e => console.log(e));