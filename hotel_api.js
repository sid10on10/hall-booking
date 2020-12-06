const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const bodyParser = require("body-parser")

app.use(bodyParser.json())

app.get("/",(req,res)=>{
    res.write("<h1>You are at the Root of web<br>Endpoints -> /rooms /createroom /bookroom /bookedrooms /customersrooms</h1>")
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
    let roomNo = req.body.roomNo
    let roomData = {
        id,noOfSeats,amenities,price,bookedStatus,roomNo
    }
    rooms.push(roomData)
    res.json({
        message:"Room is Created",
    })
})

let bookedRooms = []

function unbook(id){
    let queryRoom = rooms.find((room)=>room.id == id)
    queryRoom.bookedStatus = false
}

function clearTime(task){
    clearTimeout(task)
}

// start time and end time in js time milliseconds

app.post("/bookroom",(req,res)=>{
    let id  = bookedRooms.length+1
    let customerName = req.body.customerName
    let date = req.body.date
    let startTime = req.body.startTime
    let endTime = req.body.endTime
    let roomId = req.body.roomId
    let queryRoom = rooms.find((room)=>room.id == roomId)
    if(queryRoom.bookedStatus!=true){
        let bookedRoomData = {
            id,customerName,date,startTime,endTime,roomId
        }
        bookedRooms.push(bookedRoomData)
        queryRoom.bookedStatus = true
        var task = setTimeout(unbook,timeDiff,roomId)
        setTimeout(clearTime,timeDiff+10,task)
        res.json({
            message:"Room is Booked",
        })
    }else{
        res.json({message:"Room is Already booked",})
    }
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
