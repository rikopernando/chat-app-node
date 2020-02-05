const express = require('express')
const bodyParser = require('body-parser')
const socket = require('socket.io')
const cors = require('cors')
const models = require('./models')
const app = express()
const port = process.env.PORT || 7000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const server = app.listen(port, () => {
  console.log(`app is running on ${port}`)
})

// Setting up Socket.io
let io =  socket(server);

io.on("connection", function(socket){
  console.log("Socket Connection Established with ID :"+ socket.id)
  socket.on("chat", async function(chat){
    chat.created = new Date()
    console.log(chat)
    // let response = await new message(chat).save()
    socket.emit("chat",chat)
  })
})


app.get('/chat', async (req,res) => {
  //let result = await message.find()
  models.Message.findAll()
    .then(resp => {
      res.status(200).json({
        data: resp,
        message: "Success"
      })
    })
    .catch(error => {
      res.status(402).json({
        data: error,
        message: "error"
      })
    })
})
