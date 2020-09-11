require('dotenv').config()
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const passport = require('passport')
const JWT_SECRET = process.env.JWT_SECRET

const db = require('../../models')


//(public) test route
router.get('/test', (req, res) => {
    res.json({msg: 'User endpoint 👌'})
})



// POST api/users/register (public)
router.post('/register', (req, res) => {
    db.User.findOne({ email: req.body.email })
    .then(user => {
        if(user) {
            return res.status(400).json({ message: 'Email already exists!'})
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone
            })
            bcrypt.genSalt(10, (error, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err
                    newUser.password = hash
                    newUser.save()
                    .then(newUser => res.json(newUser))
                    .catch(err => console.log(err))
                })
            })
        }
    })
})

// POST api/users/login (public)
router.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    db.User.findOne({ email })
    .then(user => {
        if(!user){
            res.status(400).json({message: 'User not found'})
        } else {
            bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(isMatch){
                    const payload = {
                        id: user.id,
                        name: user.name,
                        email: user.email, 
                        venmo: user.venmo,
                        group_id: user.group_id[0],
                        phone: user.phone
                    }

                    jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
                        res.json({ success: true, token: `Bearer ${token}` })
                    })
                } else {
                    return res.status(400).json({ password: 'Password or email is incorrect' })
                }
            })
        }
    })
})

//Add Venmo Handle to User
router.post('/addVenmo', (req, res) => {
    db.User.findOneAndUpdate(
        {_id: req.body.userId},
        {$set: {venmo: req.body.venmoHandle}},
        {"new": true}
    )
    .then(user => {
        let {_id, ...restOfUser} = user.toObject()
        let updatedUser = {
            id: _id,
            ...restOfUser
        }
        res.send(updatedUser)
    })
})

// GET api/users/current (private)
router.get('/current', passport.authenticate('jwt', {session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        venmo: req.user.venmo,
        group_id: req.user.group_id[0],
        phone: req.user.phone
    })
})

module.exports = router
