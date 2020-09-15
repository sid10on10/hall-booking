const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const bodyParser = require("body-parser")

app.use(bodyParser.json())

app.get("/",(req,res)=>{
    res.write("<h1>You are at the Root of web<br>Endpoints -> /createroom /bookroom</h1>")
})

let rooms = [];

app.get("/rooms",(req,res)=>{
    res.json(rooms)
})

app.post("/createroom",(req,res)=>{
    let id  = rooms.length+1
    let noOfSeats = req.body.noOfSeats
    let amenities = req.body.amenities
    let price = req.body.price
    let bookedStatus = false
    let roomName = req.body.name
    let roomData = {
        id,noOfSeats,amenities,price,bookedStatus,roomName
    }
    rooms.push(roomData)
    res.json({
        message:"Room is Created",
    })
})

let bookedRooms = []

app.post("/bookroom",(req,res)=>{
    let id  = bookedRooms.length+1
    let customerName = req.body.customerName
    let date = req.body.date
    let startTime = req.body.startTime
    let endTime = req.body.endTime
    let roomId = req.body.roomId
    let queryRoom = rooms.find((room)=>room.id == roomId) 
    let bookedRoomData = {
        id,customerName,date,startTime,endTime,roomId
    }
    bookedRooms.push(bookedRoomData)
    queryRoom.bookedStatus = true
    res.json({
        message:"Room is Booked",
    })
})

app.get("/bookedrooms",(req,res)=>{
    let bookedRoomsData = []
    for(each_room of bookedRooms){
        let result = {}
        result["customerName"] = each_room.customerName
        result["date"] = each_room.date
        result["startTime"] = each_room.startTime
        result["endTime"] = each_room.endTime
        let roomId = each_room.roomId
        let queryRoom = rooms.find((room)=>room.id == roomId)
        result["bookedStatus"] = queryRoom.bookedStatus
        result["roomName"] = queryRoom.roomName
        bookedRoomsData.push(result)
    }
    res.json(bookedRoomsData)
})

app.get("/customersrooms",(req,res)=>{
    let bookedRoomsData = []
    for(each_room of bookedRooms){
        let result = {}
        result["customerName"] = each_room.customerName
        result["date"] = each_room.date
        result["startTime"] = each_room.startTime
        result["endTime"] = each_room.endTime
        let roomId = each_room.roomId
        let queryRoom = rooms.find((room)=>room.id == roomId)
        result["roomName"] = queryRoom.roomName
        bookedRoomsData.push(result)
    }
    res.json(bookedRoomsData)
})

app.listen(PORT,()=>console.log(`Server is Running at Port ${PORT}`))
