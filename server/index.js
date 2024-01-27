const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./Models/User');

const app = express();
app.use(express.json())

app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}));

const connection = async() => {
    try {
        const db = await mongoose.connect('mongodb+srv://partagowda15:9BANRT7UzNPvEYkT@cluster0.rknr1qj.mongodb.net/curd_mern_reduxtoolkit?retryWrites=true&w=majority')
        console.log('connted db')
    } catch (error) {
        console.log(error)
    }
}
// 9BANRT7UzNPvEYkT
connection()

app.get('/',async(req,res)=>{
    try {
        const userData = await UserModel.find({})
        res.status(200).json({
            users:userData
        })
    } catch (error) {
        console.log(error)
    }
})
app.post('/create',async(req,res)=>{
    try {
        const userData = await UserModel.create(req.body)
        res.status(200).json({
            users:userData
        })
    } catch (error) {
        console.log(error)
    }
})
app.put('/update/:id',async(req,res)=>{
    const id = req.params.id;
    try {
        const userData = await UserModel.findByIdAndUpdate({_id:id},req.body,{new:true})
        res.status(200).json({
            users:userData
        })
    } catch (error) {
        console.log(error)
    }
})
app.delete('/remove/:id',async(req,res)=>{
    const id = req.params.id;
    try {
        const userData = await UserModel.findByIdAndDelete(id)
        res.status(200).json({
            users:userData
        })
    } catch (error) {
        console.log(error)
    }
})

app.listen(3001,()=>{
    console.log('Server is Running.')
})
