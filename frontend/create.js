
window.onload = (async function() {
    uploadFile();
    auctionBtn();
});



function getInputValue() {
    let createValue = document.getElementsByClassName('create-input__value');
    let obj = {"price" : null, "title" : null, "patentNum" : null, "tokenId" : null, "from" : null, "to" : null};
    for(let i in createValue) {
        obj[Object.keys(obj)[i]] = createValue[i].value;
    }
    return obj;
};




function uploadFile() {
    let btnUpload = document.getElementsByClassName('btn-create__upload')[0];
    let inputFile = document.getElementById('upload-file');

    btnUpload.addEventListener('click', function(e) {
        e.preventDefault();
        inputFile.click();
    })
}


function auctionBtn() {
    let selectAuction = document.getElementsByClassName('create-select__auction');
    console.log(selectAuction);
    for(item of selectAuction) {    
        item.addEventListener('focus', function(e) {
            for(v of selectAuction) {
                v.removeAttribute('id');
                v.removeAttribute('style');
            }
            this.id = "salesType";
            this.style.border = '2px solid rgb(0, 102, 255)';
        })
    }
    
}
