const router = require("express").Router();
const db = require("../models");
const mongoose = require("mongoose");

// create Venmo Model
// include item, inputPrice, user_id, group_id, splitPrice

//post route to create the item
//find the group and the users array, count the number of people in the array,
//divide the inputPrice by the number of users in the group
// db.venmo.create add the userid, the groupid, item name, input price
