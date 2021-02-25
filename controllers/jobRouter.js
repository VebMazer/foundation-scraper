const jobRouter = require('express').Router()

const Nightmare = require('nightmare')
//const nightmare = Nightmare({ show: false })

//Oikotie työpaikka haku.
jobRouter.post('/oikotie', async (req, res) => {
  try {
    let { } = req.body

    const nightmare = Nightmare({ show: false })

    let objects = null

    //https://tyopaikat.oikotie.fi/tyopaikat/helsinki?hakusana=Developer
    await nightmare
        .goto('https://tyopaikat.oikotie.fi/tyopaikat/helsinki?hakusana=Developer')
        //.type('input.field', 'trainee')
        //.click('button.primary')
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
          objects = array.map(j => ({link: j}))

        })
        .catch(error => {
          console.error('scraping failed:', error)
        })

    console.log(objects)
    res.json(objects)

  } catch (exception) {
    return res.status(500).json({ error: 'something went wrong...' })
  }
})


jobRouter.post('/avointyopaikka', async (req, res) => {
  try {
    let { keyword, location } = req.body

    const nightmare = Nightmare({ show: false })

    //avointyopaikka.fi
    //https://avointyopaikka.fi/hae?kw=HAKUSANA&location=LOKAATIO
    nightmare
    .goto(`https://avointyopaikka.fi/hae?kw=${keyword}&location=${location}`)
    .wait('div.search-results__content')
    .evaluate(selector => {
      return Array.from(document.querySelectorAll(selector))
        .map(element => element.href)
      //.filter((el) => {
      //    return el && el != ''
      //});
    }, 'a.job-item__link')
    .end()
    .then( data => {
      const array = Object.values(data)
      data = (JSON.stringify(array, null, 1))
      console.log(data)

    })
    .catch(error => {
      console.error('scraping failed:', error)
    })

  } catch (exception) {
    return res.status(500).json({ error: 'something went wrong...' })
  }

})

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
