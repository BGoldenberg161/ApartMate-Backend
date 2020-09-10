const router = require("express").Router();
const db = require("../models");
const mongoose = require("mongoose");
const e = require("express");

// create Venmo Model
// include primaryVenmo, item, inputPrice, user_id(array), group_id, splitPrice
// done

router.post('/create', (req, res) => {
  db.Group.find(
    {_id: req.body.groupId}
  )
  .then(foundGroup => {
    let primaryVenmo = req.body.primaryVenmo
    //replace the variables above with the right front end stuff

    let userArray = foundGroup.users
    let groupCount = foundGroup.users.length
    let splitPrice = inputPrice/parseFloat(groupCount)
    let updatedUserArray = userArray.filter(e => e !!== req.body.userId )
    db.Venmo.create({
      primaryVenmo: ,

    })

  })
})


//post route to create the item
//find the group
// .then set the group.users array to a variable, count the number of people in the array,
// set the splitPrice variable to the divided number of the inputPrice by the number of users in the group
// remove the current userID from the new array
// db.venmo.create add the primaryVenmo(req.body.user.venmo), userids, the groupid, item name, input price, and splitPrice
// .then passthrough (venmoData) for each of the userIDs, run a db.user.find({_id: venmo.userId} function
// let venmoHandle = user.venmo
// let requestor = venmoData.primaryVenmo
// let amount = venmoData.splitPrice
// console.log(`venmo://paycharge?txn=pay&recipients=${duffl}&amount=${amount}&note=Apartmate%20%23BIOALI`)








// stretch: add venmo note
// stretch: add texting
