const express = require('express')
const router = express.Router();
const User = require('../models/User')

router.post('/create-user', async (req,res)=>{
    console.log("Create user request recieved", req.body)
    try{
        const {name, password} = req.body;

        if (!name || !password) {
            return res.status(400).json({message:'Please provide all fields'})
        }

        const existingUser =  await User.findOne({name});
        console.log('checked if user exists')
        if (existingUser){
            return res.status(400).json({message: "User already exists"})
        }

        const newUser = new User({name, password})

        const savedUser= await newUser.save()
        console.log("user created")
        res.status(201).json(savedUser)
    }
    catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
})

//gets all users data
router.get('/', async (req,res)=>{
    try{
        const users = await User.find();
        res.json(users);
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: "server error"})
    }
})

//gets one user's data
router.get("/:name", async (req, res)=>{
    try{
        const user = await User.findOne({name: req.params.name })
        if (!user) return res.status(404).json({message: "User not found"});
        res.json(user);
    }
    catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
})

//get one user's favorites
router.get("/:name/favorites", async (req, res)=>{
    try{
        const user = await User.findOne({name: req.params.name })
        if (!user) return res.status(404).json({message: "User not found"});
        res.json(user.favorites);
    }
    catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
})


//Login

router.post('/login', async (req,res)=>{

    const {name, password} = req.body;

    try{
        const user = await User.findOne({name})

        if(!user){
            return res.status(404).json({success: false, message: "User not found"})
        }

        if (user.password !== password){
            return res.status(401).json({success: false, message: "Invalid Password"})
        }

        res.status(200).json({
            success: true,
            message: "Login Successful",
            user:{
                name: user.name,
                //favorites: user.favorites || []
            }
        })
    }

    catch (err){
        console.log(err)
        res.status(500).json({success:false, message: "Server Error"})
    }



})

//Delete User Data
router.delete("/delete/:name", async (req,res)=>{
    try{
        const deletedUser = await User.findOneAndDelete({name: req.params.name})
        if (!deletedUser){
            return res.status(404).json({message: "User not found"})
        }
        res.status(200).json({
            success: true,
            message: `User ${req.params.name} successfully deleted`,
            user:{
                name: deletedUser.name,
                //favorites: user.favorites || []
            }
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'Server Error'})
    }
})

router.delete('/delFav/:name', async (req,res)=>{
        try{
            console.log("reqbody", req.body)
        const delFav = await User.findOneAndUpdate(
            {name: req.params.name},
            {$pull: {favorites: {rest_address: req.body.rest_address}}},
            {new: true},

        )

        if(!delFav){
            return res.status(404).json({success: false, message: "Favorite not found"})
        }
        console.log("FAVORITE SENT TO DELETE:", req.body);
        res.status(200).json(delFav)

    }catch (err){
        res.status(500).json({message: "Server Error during deletion"})
    }
})

router.put('/addFav/:name', async (req,res)=>{
    try{
        const addedFavs = await User.findOneAndUpdate(
            {name: req.params.name},
            {$push: {favorites: req.body}},
            {new: true},

        )

        if(!addedFavs){
            return res.status(404).json({success: false, message: "User not found"})
        }

        res.status(200).json(addedFavs)

    }catch (err){
        res.status(500).json({message: "Server Error Updating"})
    }
})

module.exports = router;