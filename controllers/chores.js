const router = require('express').Router()
const db = require('../models')
const mongoose = require('mongoose')

// test groupid: 5f56d709f133f32a113fbd81
// test userid: 5f56d709f133f32a113fbd80
// test chore: 5f56d98449de142c74f597fc

// create a new chore
router.post("/new", (req, res) => {
  db.Chore.create({
    taskName: req.body.taskName,
    user_id: req.body.user,
    taskDetail: req.body.taskDetail,
    group_id: req.body.groupId,
    isRepeating: req.body.isRepeating,
  })
    .then((createdChore) => {
      res.send(createdChore);
    })
    .catch((err) => {
      console.log("This was the error: ", err);
      res.status(503).send({ message: "Mongo don't like chores 😡" });
    });
});

// mark a chore as complete
// still need to do: create a conditional that checks the boolean of chore status and either removes the chore from the user or add it in
router.post('/:id/complete', (req, res) => {
   db.Chore.findOne({_id: req.params.id})
    .then(foundChore => {
    console.log(foundChore.isDone)
    if (foundChore.isDone === false) {
        console.log('if path was run')
        db.Chore.findByIdAndUpdate(
            {_id: req.params.id},
            {isDone: true}
        ).then(changedChore => {
        console.log(changedChore)
        })
        db.User.findByIdAndUpdate(
          { _id: req.body.user },
          { $push: { completedChore: foundChore._id } },
          { new: true }
        ).then((res) => {
          console.log(res);
        });
        res.status(201).send(foundChore);
      } else {
        console.log("else path was run");
        db.Chore.findByIdAndUpdate(
        {_id: req.params.id},
        {isDone: false}
        ).then(changedChore => {
        console.log(changedChore);
        })
        db.User.findByIdAndUpdate(
        { _id: req.body.user },
        { $pull: { completedChore: foundChore._id } }
        ).then((res) => {
         console.log(res);
            });
        res.status(201).send(foundChore);
      }
    });
})





// assign all chores randomly on Sunday at 6pm
    // stretch, send an email with this information

// display all chores for this week

// display previously completed chores

// claim a chore

// unclaim a chore

// if chore is unclaimed = grey, if chore is claimed but not done = yellow, if chore is done = green













// // {GET} get all chores for current user
// router.get('/', (req, res) => {
//     //find chores associated to userid
//     // db.Chore.find({group_id: })
//     //send to page

// })

//{POST} create new chores
router.post('/new', (req, res) => {
    db.Chore.create({
        taskName: req.body.taskName,
        taskDetail: req.body.taskDetail,
        group_id: req.body.groupId,
        dueDate: req.body.dueDate,
        startDate: req.body.startDate,
        completeDate: req.body.completeDate,
        isRecurring: req.body.isRecurring,
        icon: req.body.icon
    })
    .then(createdChore => {
        res.send(createdChore)
    })
    .catch(err => {
        console.log("This was the error: ", err)
        res.status(503).send({message: "Mongo don't like chores 😡"})
    })
})

// //{PUT} update chores
// router.put('/edit/:choreId', (req, res) => {
//     //find chore by id
//     //$set updated field

// })




module.exports = router
