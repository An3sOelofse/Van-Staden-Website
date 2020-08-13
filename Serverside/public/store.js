

let productArray = [];
let container = document.getElementById("cardcontainer");
let cards = [];
let defaultCardAmount = 20;

let myCart = [];


async function getProductData(){
    const rawData = await fetch('/cardInfo');
    return await rawData.json();
}

function createCards(startIndex,amount){

    let length = amount + startIndex;
    if(length > productArray.length){
        length = productArray.length;
    }

    for(let i = startIndex; i < length; i++){
        cards[i]= new Card(productArray[i],i);
        cards[i].create(container);
    }
}

getProductData().then(data => {
    productArray = data;
    createCards(0,defaultCardAmount);
});

function loadMoreCards(){
    createCards(cards.length,defaultCardAmount);
    if(cards.length === productArray.length){
        let moreButton = document.getElementById('loadmorebutton');
        moreButton.classList.add('off');
        let moreText = document.getElementById('loadmoretext');
        moreText.classList.add('on');
        console.log(moreButton);

    }
}

function addToCart(productIndex,colourIndex){
    //console.log(productArray[productIndex].name + ' ' +productArray[productIndex].colours[colourIndex] + ' was added to cart');
    let product = productArray[productIndex];
    
    let item = {
        name: product.name,
        colour: product.colours[colourIndex],
        productCode: product.productNumber[colourIndex],
        price: product.price
    }

    myCart[myCart.length] = item;
}







