window.onload = (async function() {
    walletOn();
    walletOff();
    await cardData();
});




function walletOn() {
    let onBtn = document.querySelector('#wallet-btn');

    onBtn.addEventListener('click', function() {
        document.querySelector('.wallet-full').style.display = "block";
    });
}


function walletOff() {
    let offBtn = document.querySelector('.wallet-btn__close');
    let modalFull = document.querySelector('.wallet-full');
    let walletBody = document.querySelector('.wallet-body');

    offBtn.addEventListener('click', function() {
        // walletBody.classList.add('wallet-animate__out');
        modalFull.removeAttribute('style');
    });

    modalFull.addEventListener('click', function() {
        modalFull.removeAttribute('style')
        
    });
}


async function cardData() {
    let cardImg = document.getElementsByClassName('card-img__img');
    let cardTitle = document.getElementsByClassName('card-slider__title');
    let cardPrice = document.getElementsByClassName('card-slider__price');
    let cnt = 0;
    for(let v = 5;  v < 10; v++) {
        await readJson(v).then((items) => {
            let data = items.patent;
            cardImg[cnt].src = data.img;
            cardTitle[cnt].innerHTML = data.title;
            cardPrice[cnt].innerHTML = data.price;
        });
        cnt++;
    }
}


async function readJson(index) {
    let res = await (await fetch('/file/patents/' + index)).json();
    return(res);
}