const express = require('express')
const bodyParser = require('body-parser')
const socket = require('socket.io')
const cors = require('cors')
const {Message, Users, Chat} = require('./models')
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
    Chat.create({
      message: chat.message,
      user_id: chat.user_id
    })
    .then(resp => {
      //console.log(resp)
      io.sockets.emit("chat", resp)
    })
    .catch((err) => {
      console.log(err)
    })
  })
})

app.post('/add-user', (req, res) => {
  const {name} = req.body
  Users.create({name})
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

app.get('/chat', async (req,res) => {
  //let result = await message.find()
  Chat.findAll({
      attributes: ['id', 'message', 'user_id', 'createdAt'],
      include: [{
        model: Users,
        attributes: ['name']
      }]
    })
    .then(resp => {
      res.status(200).json({
        data: resp,
        message: "Success"
      })
    })
    .catch(error => {
      console.log(error)
      res.status(402).json({
        data: error,
        message: "error"
      })
    })
})
