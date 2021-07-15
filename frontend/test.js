window.onload = (async function () {

    dropDown();
    // getDirLength();

    for(let i = 2; i <= 100; i++) {
        try{
            await readJson(i).then((items) => {
                makeCard(items.patent, i);
            });
        }catch(e) {
            break;
        }
    }
    detailModalView();
});

async function getDirLength() {
    let res = await (await fetch('/file/len')).body;
    console.log(res);
    return(res);
}


async function getPatentData(index) {
    let res = await (await fetch('/file/patents/' + index)).json();
    return(res)
}



async function modalData(btnValue) {
    let patentData = await getPatentData(btnValue);
    let innerTitle = patentData.patent.title;
    let innerImage = patentData.patent.img;
    let innerDesc = patentData.patent.desc;
    let innerOwner = patentData.patent.owner; 
    let innerNum = patentData.patent.number;
    let innerPrice = patentData.patent.price;

    let patentIndex = document.getElementById('patentIndex');

    patentIndex.value = btnValue;
    if(innerTitle.length === 0) {
        innerTitle = "Patent's title";
    }

    if(innerImage.length === 0) {
        innerImage = "https://hangeulaward.co.kr/src/images/noImg.gif";
    }
    
    if(innerDesc.length === 0) {
        innerDesc = "Non Desc";
    }

    document.getElementById('product-title').innerText = innerTitle;
    document.getElementById('product-img').src = innerImage;
    document.getElementById('product-desc').innerText = innerDesc;
    // document.getElementById('patent-owner').innerText = innerOwner;
    document.getElementById('patent-num').innerText = innerNum;
    document.getElementById('patent-price').innerText = innerPrice;
    console.log(innerOwner);
    console.log(innerImage);
}



function detailModalView() {
    let productDetail = document.querySelectorAll('.product-item');
    let productModal = document.querySelector('.detail-full');
    let modalBody = document.querySelector('.detail-full');
    let modal = document.querySelector('.detail-body');
    

    productDetail.forEach(function(i) {
        i.addEventListener('click', async function(e) {
            // for(v of productDetail) {
            //     v.removeAttribute('id');
            // }
            // e.target.id = "searchButton"
            productModal.style.display = "block";
            await modalData(e.target.value);
        });
    })

    modalBody.addEventListener('click', function(e) {
        e.target.id === 'modal-out' ? modalBody.removeAttribute('style') : false;
    })
}


function dropDown() {
    let clickedBtn = document.querySelectorAll('.select-drop__wrap');

    clickedBtn.forEach(function (i) {
        i.addEventListener('click', function (e) {
            if (i == clickedBtn[0] && document.querySelector('.drop-item__category').style.maxHeight == 0) {
                document
                    .querySelector('.drop-item__category')
                    .style
                    .maxHeight = "fit-content";
            } else if (i == clickedBtn[1] && document.querySelector('.drop-item__sort').style.maxHeight == 0) {
                document
                    .querySelector('.drop-item__sort')
                    .style
                    .maxHeight = "fit-content";
            } else if (i == clickedBtn[0] && document.querySelector('.drop-item__category').style.maxHeight == "fit-content") {
                document
                    .querySelector('.drop-item__category')
                    .removeAttribute("style");
            } else if (i == clickedBtn[1] && document.querySelector('.drop-item__sort').style.maxHeight == "fit-content") {
                document
                    .querySelector('.drop-item__sort')
                    .removeAttribute("style");
            }
        })
    })
}

async function readJson(index) {
    let res = await (await fetch('/file/patents/' + index)).json();
    return(res);
}



function makeCard(data, i) {
    let cardBox = document.getElementById('card-box');
    let checkTitle = data.title;
    let checkImg = data.img;

    if(checkTitle.length === 0) {
        data.title = "Patent's title";
    }
    if(checkImg.length === 0) {
        data.img = "https://hangeulaward.co.kr/src/images/noImg.gif";
    }
    let card = `<div class="col-12 col-md-3 py-3">
    <div class="contents-hover">
        <div class="card h-100">
            <div class="card-body d-flex flex-column">
                <div
                    class="card--color__header margin-bottom_2r d-flex justify-content-between card--color--type__epic">
                    <img src="${data.img}"
                        alt="" class="card-img__border">
                </div>

                <div class="px-4 d-flex flex-column card-product__title">
                    <h3 class="card-product__title margin-bottom_1r">
                        ${data.title}
                    </h3>

                    <div class="row py-2">
                        <div class="col pr-0">
                            <h3 class="m-0 font-weight-light">Price</h3>
                        </div>
                        <div class="col text-right">
                            <!-- app-countdown -->
                            <div>
                                <h3 class="m-0 font-weight-light">
                                    ${data.price}
                                </h3>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="mt-auto">
                    <div class="p-4 mx-4 pt-5">

                        <span class="input-group-prepend">
                            <button class="btn btn-light btn-url product-item" value=${i}>
                                Detail
                            </button>
                        </span>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;

cardBox.innerHTML += card;

// detailModalView(data);
}