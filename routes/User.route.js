const router = require('express').Router();
const {User} = require('../models/models');
const userValidation = require('../validation/User.validation');
const bcryptjs = require('bcryptjs');
const verify = require('../middlewares/verify');

// Adds a new User
router.post('/',async(req,res)=>{
    const{name,studioName,studioType,email} = req.body 

    try {
    // Validate the submitted user
    const {error} = userValidation(req.body);
    if(error)return res.status(400).send(error.details[0].message)

    // Check if This is a new user
    const emailExist = await User.findOne({email:req.body.email})
    if(emailExist) return res.status(400).send('That Email is already taken');

    // encrypt Password
    const salt = await bcryptjs.genSalt(10);
    const password = await bcryptjs.hash(req.body.password,salt);

    // create user
    const user = new User({name,studioName,studioType,email,password});

    //save user    
        await user.save()
        res.send(user)
    } 
    catch (error) {
        res.status(400).send(error)
    }
})
// Gets a user and returns non-sensitive material
router.get('/:id',verify,async (req,res)=>{
    const userId = req.params.id;
    const user = await User.findById(userId)
    .then((user)=>res.send(user))
  })

router.get('/',verify,async (req,res)=>{
    const userId = req.user._id;
    const user = await User.findById(userId)
    .then((user)=>res.send(user))
  })
// deletes a user
router.delete('/:id',verify,async(req,res)=>{
    const userId = req.params.id 
    const user = await User.findByIdAndDelete(userId,{useFindAndModify:false})
    user == null ? res.send(`User not found`) : res.send('User Was Deleted')
     })
// updates a user
router.put('/:id',verify,async(req,res)=>{
    const {name,email,studioName} = req.body
    let password = req.body.password

    const {error}=userValidation(req.body);
    if(error)return res.status(400).send(error)

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password,salt)

    password = hashedPassword

    const userId = req.params.id;
    const databaseUser = await User.findById(userId)

    if(databaseUser == null) return res.status(400).send('User Not Found')
    const updatedUser ={ ...databaseUser._doc,...{name,email,password,studioName}};
    User.findByIdAndUpdate(userId,updatedUser,()=>{
        res.send(`The User Was Updated!`)
    })
    })
    
module.exports = router