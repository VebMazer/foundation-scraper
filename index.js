const express = require('express')
const app = express()

const Nightmare = require('nightmare')
const fs = require('fs');
const nightmare = Nightmare({ show: false })

nightmare
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
      let list = (JSON.stringify(array, null, 1))

      fs.writeFile('links.json', list, (err) => {
        if (err) throw err
        console.log('JSON saved!')
      })
    })
    .catch(error => {
      console.error('scraping failed:', error)
    })

app.get('/', (req, res) => {
  if(data === ''){
    res.send(`<h1>Data not yet available</h1>`)
  } else{
      res.send(`<h1>${data}</h1>`)
  }

    });

const PORT = 3002
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
