const express = require('express')
const bodyParser = require('body-parser')
const Nightmare = require('nightmare')
const fs = require('fs')
const cors = require('cors')
//const http = require('http').createServer(App)

const nightmare = Nightmare({ show: false })

const jobRouter = require('./controllers/jobRouter')

let data = {}

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static('build'))

app.get('/', (req, res) => {
  // if(data === {}){
  //   res.send(`<h1>Data not yet available</h1>`)
  // } else{
  //     res.json(data)
  //     //res.send(`<h1${data.json}</h1>`)
  // }
  res.json(data)

})

app.use('/jobs', jobRouter)

const PORT = 3002
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
