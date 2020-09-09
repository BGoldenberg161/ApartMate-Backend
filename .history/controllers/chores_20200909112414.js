const router = require('express').Router()
const db = require('../models')
const mongoose = require('mongoose')


// test groupid: 5f56d709f133f32a113fbd81
// test userid: 5f56d709f133f32a113fbd80
// test chore: 5f56d98449de142c74f597fc

// display all the chores for your group. (sorted by most recent)
router.get('/:groupId', (req, res) => {
    db.Chore.find({ group_id: req.params.groupId })
      .sort("-date")
      .exec(function (err, collectionItems) {
        collectionItems.forEach((collectionItems) => {
            db.User.find({ _id: collectionItems.claim })
            .then(users => {
              console.log(users);
              db.Chore.findByIdAndUpdate(
                { _id: collectionItems._id },
                { claimName: users.name }
              ).forEach(users => {
                console.log(users)
              })
              .then((claimedName) => {
                console.log("claimed users: " + claimedName);
              })
            });
          })
        res.send(collectionItems)
      })
})

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

// mark a chore as complete and incomplete
// if chore is marked as completed, then make it green
// if that is hard logic to implement on the front-end, I can make it set the "claim" field to "completed" for your front-end if statement
router.post('/:id/complete', (req, res) => {
   db.Chore.findOne({_id: req.params.id})
    .then(foundChore => {
    console.log(foundChore.isDone)
    if (foundChore.isDone === false) {
        console.log('if path was run')
        db.Chore.findByIdAndUpdate(
            {_id: req.params.id},
            {isDone: true,
            neverDone: false
            }
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

// if chore is unclaimed = grey, if chore is claimed but not done = yellow, if chore is done = green


// claim a chore
// front end logic: if claim = '' then it should be grey, if it's not an empty string, it's claimed
router.post('/:id/claim', (req, res) => {
  db.Chore.findByIdAndUpdate(
    { _id: req.params.id },
    // replace this whatever you name it on the front end
    { claim: req.body.user }
  ).then((claimedChore) => {
    res.status(201).send(claimedChore);
  });
})

// stretch, unclaim a chore, if you unclaim a chore everyone is notified that you unclaimed it.

// //{PUT} Edit the Name of the Chore
// router.put('/edit/:choreId', (req, res) => {
//   db.Chore.findById(req.params.choreId)
// })













// // {GET} get all chores for current user
router.get('/', (req, res) => {
    // find chores associated to userid
    db.Chore.find({claim: req.body.user})
    .then(chores => {
      res.send(chores)
    })
    .catch((err) => {
      console.log("This fetch chores error: ", err);
      res.status(503).send({ message: "Mongo don't like chores 😡" });
    });
})







module.exports = router
