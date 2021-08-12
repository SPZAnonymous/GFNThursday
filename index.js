const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express');
const app = express();

const fetchData = async(url) => {
    const result = await axios.get(url)
    return result.data
}
const PORT = process.env.PORT || 8080;
const main = async () => {
    const content = await fetchData("https://www.nvidia.com/en-us/geforce-now/games/")
    const $ = cheerio.load(content)
    let gfn = []

    $('div.body-text.description.color-body-copy').each((i, e) => {
      const title = $(e).find('p').text();
      title2 = title.replace("and news - new games are added to our library*.", "").replace("GeForce NOW connects to digital PC game stores so you can stream your own library of games. And, every GFN Thursday - our dedicated day for highlighting the newest games, features", "");
      games = title2.replace("Search below to find your library of games, or look for new ones including many of the latest releases and top free-to-play games – all available instantly.", "").replace("*Some games listed may not appear until later in the week, including new game launches. You must already own or purchase titles to play them on GeForce NOW.", "")
      games2 = games.split("(").join("**(")
      games3 = games2.split(")").join(")** \n")
  
      const data = {games3}
      gfn.push(data)
      app.get('/', (req, res) => {
           res.json({
              games: games3
           })

        })
        app.listen(PORT, () => {})

    })

    console.log(gfn)
}

main()
