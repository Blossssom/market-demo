const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// let html = "";

const crawlFilePath = './file/crawl/crawl.json';
let crawlList = JSON.parse(fs.readFileSync(crawlFilePath, 'utf8'));
const crawlFileDir = './file/crawl/';
 n
async function getHtml(patentNum) {
    try {
        return await axios.get(`http://kpat.kipris.or.kr/kpat/biblioa.do?method=biblioMain_biblio&next=biblioViewSub01&applno=${patentNum}&getType=BASE&link=N`);      
    }catch(error) {
        console.log(error);
    }
}


async function getPatent(pNum) {
    let html = await getHtml(pNum);
    let dataArr = [];

    const $ = cheerio.load(html.data);
    const $bodyList = $('h1.title_hidden').text();
    const $img = 'http://kpat.kipris.or.kr' + $('span > img').attr('src');
    const $desc = $('summary > p').text();
    

    dataArr.push({title : $bodyList, img : $img, desc : $desc});
    fs.writeFileSync(crawlFilePath, JSON.stringify(dataArr), function (err) {
        if(err) {
            console.log(err);
        }
    })
}

// getPatent();

module.exports = { getPatent };
