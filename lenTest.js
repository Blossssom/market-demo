const fs = require('fs');
const dir = './file/patents';

fs.readdir(dir, (err, files) => {
    console.log(files.length);
});