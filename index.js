const express = require('express')
const bodyParser = require('body-parser')
const Nightmare = require('nightmare')
const fs = require('fs')


const nightmare = Nightmare({ show: false })

const jobRouter = require('./controllers/jobRouter')

let data = {}

const app = express()

app.use(bodyParser.json())

    //avointyopaikka.fi
    nightmare
    .goto('https://avointyopaikka.fi/')
    .type('#s2id_autogen1', 'Developer')  //Tehtävä /yritys / hakuasan
    .type('#s2id_autogen2', 'Helsinki')  //Paikkakunta
    .click('button.primary')  //Tähän button, jolla pääsee eteenpäin
    .wait('div.job-ad-list-with-publication-date-titles')
    .evaluate(selector => {
      return Array.from(document.querySelectorAll(selector))
        .map(element => element.href)
      //.filter((el) => {
      //    return el && el != ''
      //});
    }, 'a.job-item__link wrapping-link')
    .end()
    .then( data => {
      const array = Object.values(data)
      data = (JSON.stringify(array, null, 1))
      //let list = (JSON.stringify(array, null, 1))

      // fs.writeFile('links.json', list, (err) => {
      //   if (err) throw err
      //   console.log('JSON saved!')
      // })

      //data = {objects: list}
      console.log(data)

    })
    .catch(error => {
      console.error('scraping failed:', error)
    })

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
