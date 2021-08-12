const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express');
const app = express();

const fetchData = async(url) => {
    const result = await axios.get(url)
    return result.data
}

const main = async () => {
    const content = await fetchData("https://www.nvidia.com/en-us/geforce-now/games/")
    const $ = cheerio.load(content)
    let gfn = []

    $('div.body-text.description.color-body-copy').each((i, e) => {
      const title = $(e).find('p').text();
      title2 = title.replace("and news - new games are added to our library*.", "").replace("GeForce NOW connects to digital PC game stores so you can stream your own library of games. And, every GFN Thursday - our dedicated day for highlighting the newest games, features", "");
      games = title2.replace("Search below to find your library of games, or look for new ones including many of the latest releases and top free-to-play games – all available instantly.", "").replace("*Some games listed may not appear until later in the week, including new game launches. You must already own or purchase titles to play them on GeForce NOW.", "")
      const data = {games}
      gfn.push(data)

      
        //console.log(juegos_text3)

    //gfn.push(dateira)
    })

    console.log(gfn)
}

main()
