const express = require('express');
const app = express();

const PORT = process.env.PORT || 8877;

const cheerio = require("cheerio")
const request = require("request-promise")


async function init_test() {
    const $ = await request({
        uri: 'https://www.nvidia.com/en-us/geforce-now/games/',
        transform: body => cheerio.load(body)

    })
    const juegos = $('.container .general-container-text .body-text p').each((i, el) => {
        const juegos_text = (i, $(el).text());
        juegos_text2 = juegos_text.replace("and news - new games are added to our library*.", "").replace("GeForce NOW connects to digital PC game stores so you can stream your own library of games. And, every GFN Thursday - our dedicated day for highlighting the newest games, features", "");
        juegos_text3 = juegos_text2.replace("Search below to find your library of games, or look for new ones including many of the latest releases and top free-to-play games – all available instantly.", "").replace("*Some games listed may not appear until later in the week, including new game launches. You must already own or purchase titles to play them on GeForce NOW.", "")
        console.log(juegos_text3)
    })
    
    app.get('/about'. (req, res) => {
        res.json({
            title: juegos_text3
        )}
    )}
            
    return juegos_text3


}

init_test()
