

let productArray = [];
let container = document.getElementById("cardcontainer");
let cartButton = document.getElementById("carticon");
let checkout = document.getElementById("checkout");
let navlist = document.getElementById("navlist");
let navlistOn = false;
let cartButtonActive = false;
let checkoutVisible = false;
let cards = [];
let filteredCards = cards;
let defaultCardAmount = 21;
let currentCardAmount = 0;

let myCart = [];
let cartlets = []; 


async function getProductData(){
    const rawData = await fetch('/cardInfo');
    return await rawData.json();
}

function createCards(){
    for(let i = 0; i < productArray.length; i++){
        cards[i]= new Card(productArray[i],i);
        cards[i].create();
    }
    for(let i = 0; i < defaultCardAmount; i++){
        cards[i].appendToContainer(container);
        currentCardAmount++;
    }
}

getProductData().then(data => {
    productArray = data;
    createCards(0,defaultCardAmount);
});

function loadMoreCards(){
    
    let endpoint = defaultCardAmount + currentCardAmount; 
    if(endpoint > filteredCards.length){
        endpoint = filteredCards.length;
    }

    for(let i = currentCardAmount; i < endpoint; i++ ){
        filteredCards[i].appendToContainer(container);
        currentCardAmount++;
    }

    if(filteredCards.length === currentCardAmount){
        let moreButton = document.getElementById('loadmorebutton');
        moreButton.classList.add('off');
        let moreText = document.getElementById('loadmoretext');
        moreText.classList.add('on');
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
    let cartIndex = myCart.length;
    myCart[cartIndex] = item;
    cartlets[cartIndex] = new Cartlet(cartletOptions);
    cartlets[cartIndex].create(cartIndex);
    cartlets[cartIndex].appendToContainer(document.getElementById('cartlist'));

}

function removeFromCart(index){
    let cartListContainer = document.getElementById('cartlist');
    cartListContainer.removeChild(cartListContainer.childNodes[index]);

    myCart.splice(index,1);
    cartlets.splice(index,1);

    for(let i = 0; i < cartlets.length;i++){
        cartlets[i].setIndex(i);
    }
}

function cartClicked(){
    checkout.classList.remove('off');
    cartButton.classList.remove('on');
    cartButtonActive = false;
    document.getElementById('htmlElement').classList.add('noscroll');
    document.getElementById('nav').classList.add('invisible');
    document.body.classList.add('noscroll');
    
}

function closeCart(){
    checkout.classList.add('off');
    cartButton.classList.add('on');
    cartButtonActive = true;
    document.getElementById('htmlElement').classList.remove('noscroll');
    document.getElementById('nav').classList.remove('invisible');
    document.body.classList.remove('noscroll');
}

function hamburgerClicked(){
    if(!navlistOn){
        navlist.classList.add('on');
        navlistOn = true;
    }
    else{
        navlist.classList.remove('on');
        navlistOn = false;
    }

}

function linkClicked(ref){

    container.innerHTML = '';
    filteredCards = [];
    currentCardAmount = 0;

    let moreButton = document.getElementById('loadmorebutton');
    moreButton.classList.remove('off');
    let moreText = document.getElementById('loadmoretext');
    moreText.classList.remove('on');

    if(navlistOn){
        navlist.classList.remove('on');
        navlistOn = false;
    }

    if(ref === 'mens'){
        filteredCards = cards.filter(c => {
            return (!productArray[c.index].ladies && !productArray[c.index].youth && !productArray[c.index].kids);
        });
    }
    else if(ref === 'ladies'){
        filteredCards = cards.filter(c => {
            return (productArray[c.index].ladies);
        });
    }
    else if(ref === 'youth'){
        filteredCards = cards.filter(c => {
            return (productArray[c.index].youth);
        });
    }
    else if(ref === 'kids'){
        filteredCards = cards.filter(c => {
            return (productArray[c.index].youth);
        });
    }
    else if(ref === 'hats'){
        
    }
    else if(ref === 'acc'){
        
    }

    loadMoreCards();
    filteredCards[0].card.scrollIntoView();

}








