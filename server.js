require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 8000
const passport = require('passport')
const schedule = require("node-schedule");
const db = require('./models')


app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/groups", require("./controllers/groups"));
app.use("/chores", require("./controllers/chores"));

//passport middleware
app.use(passport.initialize())
require('./config/passport')(passport)

const users = require('./routes/api/users')



app.get('/', (req, res) => {
    res.status(200).json({ message: 'Backend 🍑'})
})

app.use('/api/users' , users)

let resetAssignments = schedule.scheduleJob("0 16 ? * 7", function () {
    // create algorithm for shuffling user assignments
    // create function for sending out the email to the current users
});



app.listen(port, () => {
    console.log(`Listening to the smooth sounds of ${port}`)
})
