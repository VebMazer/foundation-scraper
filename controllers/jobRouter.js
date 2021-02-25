const jobRouter = require('express').Router()

const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: false })

//Oikotie työpaikka haku.
scrapingRouter.get('/oikotie', async (req, res) => {
  try {
    let { location } = res.body

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

    res.json(data)

  } catch (exception) {
    return res.status(500).json({ error: 'something went wrong...' })
  }
})


scrapingRouter.get('/avointyopaikka', async (req, res) => {
  try {


  } catch (exception) {
    return res.status(500).json({ error: 'something went wrong...' })
  }

}

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

module.exports = jobRouter
