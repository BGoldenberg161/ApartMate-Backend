const router = require("express").Router();
const db = require("../models");
const mongoose = require("mongoose");

// create Venmo Model
// include item, inputPrice, user_id(array), group_id, splitPrice

//post route to create the item
//find the group and the users array, count the number of people in the array,
//set the splitPrice variable to the divide the inputPrice by the number of users in the group
// db.venmo.create add the userid, the groupid, item name, input price
