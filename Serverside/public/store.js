

let productArray = [];
let container = document.getElementById("cardcontainer");
let cartButton = document.getElementById("carticon");
let checkout = document.getElementById("checkout");
let cartButtonActive = false;
let checkoutVisible = false;
let cards = [];
let defaultCardAmount = 20;

let myCart = [];
let cartlets = []; 


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
    
    if(!cartButtonActive){
        cartButton.classList.add('on');
        cartButtonActive = true;
    }

    let product = productArray[productIndex];
    
    let item = {
        name: product.name,
        colour: product.colours[colourIndex],
        productCode: product.productNumber[colourIndex],
        price: product.price
    }
    let cartletOptions = {
        name: product.name,
        colour: product.colours[colourIndex],
        productCode: product.productNumber[colourIndex],
        price: product.price,
        amount: 1,
        mainImgDir: cards[productIndex].getMainImgDir(),
        colourImgDir: cards[productIndex].getColourImgDir()
    }

    myCart[myCart.length] = item;
    cartlets[myCart.length] = new Cartlet(cartletOptions);
    cartlets[myCart.length].create(document.getElementById('cartlist'));

}

function cartClicked(){
    checkout.classList.remove('off');
    cartButton.classList.remove('on');
    cartButtonActive = false;
    document.getElementById('htmlElement').classList.add('noscroll');
    document.body.classList.add('noscroll');
    
}

function closeCart(){
    checkout.classList.add('off');
    cartButton.classList.add('on');
    cartButtonActive = true;
    document.getElementById('htmlElement').classList.remove('noscroll');
    document.body.classList.remove('noscroll');
}







