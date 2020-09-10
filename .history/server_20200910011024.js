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
app.use('/venmo', require('./controllers/venmo'))

//passport middleware
app.use(passport.initialize())
require('./config/passport')(passport)

const users = require('./routes/api/users')



app.get('/', (req, res) => {
    res.status(200).json({ message: 'Backend 🍑'})
})

app.use('/api/users' , users)

// assign all chores randomly on Sunday at 6pm
let resetAssignments = schedule.scheduleJob("0 16 ? * 7", function () {
// test route: app.post('/resetAll', (req, res) => {
    // create algorithm for shuffling user assignments
    db.Group.find()
    .then(foundGroups => {
        foundGroups.forEach(foundGroups => {
            // console.log(foundGroups)
            db.Chore.find(
                {group_id: foundGroups._id}
            ).then(foundChores => {
                // console.log(foundChores)
                foundChores.forEach(foundChores => {
                    if(foundChores.isDone === false) {
                        console.log('If')
                        db.Chore.findByIdAndUpdate(
                          { _id: foundChores._id },
                          { $set: { neverDone: true } },
                          { new: true }
                        ).then(choresCheck => {
                        console.log("Never Done" + choresCheck.neverDone)
                        })
                    } else {
                        console.log('Else')
                        db.Chore.findByIdAndUpdate(
                          { _id: foundChores._id },
                          { $set: { isDone: false } },
                          { new: true }
                        ).then(choresCheck => {
                            console.log("Completed" + choresCheck.isDone)
                        })
                    }
                })
            })
            .then(foundGroups => {
                db.Group.find()
                .then(foundGroupsTwo => {
                foundGroupsTwo.forEach(foundGroupsTwo => {
                    db.Chore.find(
                        {
                        group_id: foundGroupsTwo._id,
                        isRepeating: true,
                        neverDone: false
                    }
                    ).then(foundChoresTwo => {
                        console.log("found chores" + foundChoresTwo);
                        foundChoresTwo.forEach(foundChoresTwo => {
                            let maxIndexNumber = foundGroupsTwo.users.length;
                            let randomIndex = Math.floor(Math.random() * maxIndexNumber);
                            db.Chore.findByIdAndUpdate(
                                {_id: foundChoresTwo._id},
                                {$set: {claim: foundGroupsTwo.users[randomIndex]}},
                                {new: true}
                            )
                            .then(assignedChores => {
                                console.log("assigned chores" + assignedChores._id)
                            })
                        })
                    })
                    .then(response => {
                    // console.log(response)
                    })
                })
                })
            })
        })
    })
    // create function for sending out the email to the current users
});



app.listen(port, () => {
    console.log(`Listening to the smooth sounds of ${port}`)
})
