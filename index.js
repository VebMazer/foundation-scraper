const express = require('express')
const app = express()

const Nightmare = require('nightmare')
const fs = require('fs');
const nightmare = Nightmare({ show: false })

let data = {}

//Oikotie.fi
/*nightmare
    .goto('https://tyopaikat.oikotie.fi')
    .type('input.field', 'trainee')
    .click('button.primary')
    .wait('div.job-ad-list-with-publication-date-titles')
    .evaluate(selector => {
      return Array.from(document.querySelectorAll(selector))
        .map(element => element.href)
      //.filter((el) => {
      //    return el && el != ''
      //});
    }, 'a.job-ad-list-item-link')
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
*/
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

const scrapingRouter = require('express').Router()
app.use('/', scrapingRouter)

const PORT = 3002
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
