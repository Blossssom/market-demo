// basic code

const { getPatent } = require('./crawl.js');
const express = require('express');
const app = express();
const port = 9100;


app.use(express.static(__dirname + '/frontend/'));
app.use(express.static(__dirname + '/frontend/assets/slick'));
// app.get('/register', (req, res) => res.sendFile(__dirname + '/frontend/index.html'));
app.get('/main', (req, res) => res.sendFile(__dirname + '/frontend/main.html'));
app.listen(port, () => console.log('http://localhost:' + port + '/main'));

// NEED TO MERGE
const fs = require('fs');

const registerListFilePath = './file/register/list.json';
const patentFileDir = './file/patents/';
var registerList = JSON.parse(fs.readFileSync(registerListFilePath, 'utf8'));

app.use(express.json({ limit:'1mb' }));

app.post('/file/register', (req, res) => {
    // TODO : need to trace the transaction, remove the reverted transaction.
    registerList.push(req.body);
    fs.writeFile(registerListFilePath, JSON.stringify(registerList), function (err) {
        if (err) {
            res.json({ status:'NOK' });
        } else {
            res.json({ status:'OK' });
        }
    });
});

const crawlFilePath = './file/crawl/crawl.json';
// let crawlList = JSON.parse(fs.readFileSync(crawlFilePath, 'utf8'));
// const crawlFileDir = './file/crawl/'

app.get('/file/crawl/:id', async(req, res) => {
    await getPatent(req.params.id);
    
    fs.readFile(crawlFilePath, 'utf8', function (err, json) {
        if (err) {
            res.json({ status:'NOK' });
        } else {
            let patent = JSON.parse(json);
            res.json(patent);
        }
    });
});


app.get("/file/len", (req, res) => {
    let dirPath = './file/patents';
    fs.readdir(dirPath, (err, files) => {
        if(err) {
            console.log(err);
        }else {
            let sol = files.length;
            res.send(sol);
        }
    });
})



app.get("/file/patents/:id", (req, res) => {
    fs.readFile(patentFileDir+req.params.id, 'utf8', function (err, json) {
        if (err) {
            res.json({ status:'NOK' });
        } else {
            let patent = JSON.parse(json);
            res.json({ status:'OK', patent });
        }
    });
});

const { ethers } = require("ethers");
const provider = new ethers.providers.JsonRpcProvider('HTTP://127.0.0.1:7545');
const patentMarketAddress = '0x6e62f9d95C83B07dd32e59510E845bc634c4312F'; // NEED TO CHANGE
const patentMarketAbi = [
    "function getPatentById(uint patentId) public view returns(string memory number, address owner, uint8 status, uint8 salesType, uint256 price, uint256 deadline)",
    "event PatentRegistered(address owner, uint patentId)"
];
const patentMarketContract = new ethers.Contract(patentMarketAddress, patentMarketAbi, provider);
patentMarketContract.on("PatentRegistered", (from, patentId, event) => {
    _ProcessPatentRegistered(from, patentId);
});





async function _ProcessPatentRegistered(from, patentId) {
    if(_IsFileAlreadyExist(patentId))
        return;

    let index = await _FindPatentFromRegisterList(patentId);
    if(index === -1) {
        // TODO need crawling
        return;
    }

    _WritePatentInfoFile(patentId, registerList[index]);

    _DeletePatentFromRegisterList(index);
}

function _IsFileAlreadyExist(patentId) {
    let path = patentFileDir+patentId;
    if(fs.existsSync(path)) {
        return 1;
    }
    return 0;
}

async function _FindPatentFromRegisterList(patentId) {
    let patent = await patentMarketContract.getPatentById(patentId);
    let i, find = 0;
    for (i = 0 ; i < registerList.length ; i++) {
        if( registerList[i].owner.toLowerCase() === patent.owner.toLowerCase() &&
            registerList[i].number === patent.number &&
            registerList[i].type === patent.salesType.toString() &&
            registerList[i].price === patent.price.toString() &&
            registerList[i].deadline === patent.deadline.toString()) {
            registerList[i].owner = patent.owner; // Contract's address notation
            return i;
        }
    }
    return -1; // Not found.
}

function _WritePatentInfoFile(patentId, json) {
    fs.writeFileSync(patentFileDir+patentId, JSON.stringify(json));
    console.log('Create file: '+patentFileDir+patentId);
}

function _DeletePatentFromRegisterList(index) {
    registerList.splice(index, 1);
    fs.writeFileSync(registerListFilePath, JSON.stringify(registerList));
}
// MERGE END



