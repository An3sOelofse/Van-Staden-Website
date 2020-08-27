

let productArray = [];
let container = document.getElementById("cardcontainer");
let cartButton = document.getElementById("carticon");
let checkout = document.getElementById("checkout");
let navlist = document.getElementById("navlist");
let emailInput1 = document.getElementById('emailinput');
let emailInput2 = document.getElementById('emailinputverify');
let navlistOn = false;
let cartButtonActive = false;
let checkoutVisible = false;
let cards = [];
let filteredCards = cards;
let defaultCardAmount = 21;
let currentCardAmount = 0;

let myCart = [];
let totalPrice = 0;
let cartlets = []; 


async function getProductData(){
    const rawData = await fetch('/get-product-data');
    return await rawData.json();
}

getProductData().then(data => {
    productArray = data;
    createCards();
});

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

function addToCart(productIndex,sizeIndex,colourIndex){
    
    if(!cartButtonActive){
        cartButton.classList.add('on');
        cartButtonActive = true;
    }

    let product = productArray[productIndex];
    
    let item = {
        name: product.name,
        colour: product.colours[colourIndex],
        productCode: product.productNumber[colourIndex],
        price: product.prices[colourIndex][sizeIndex],
        size: product.sizes[sizeIndex]
    }
    let cartletOptions = {
        name: product.name,
        colour: product.colours[colourIndex],
        productCode: product.productNumber[colourIndex],
        price: product.prices[colourIndex][sizeIndex],
        size: product.sizes[sizeIndex],
        amount: 1,
        mainImgDir: cards[productIndex].getMainImgDir(),
        colourImgDir: cards[productIndex].getColourImgDir()
    }
    totalPrice += item.price
    document.getElementById('totalprice').innerText = 'R' + totalPrice;
    let cartIndex = myCart.length;
    myCart[cartIndex] = item;
    cartlets[cartIndex] = new Cartlet(cartletOptions);
    cartlets[cartIndex].create(cartIndex);
    cartlets[cartIndex].appendToContainer(document.getElementById('cartlist'));

}

function removeFromCart(index){
    let cartListContainer = document.getElementById('cartlist');
    cartListContainer.removeChild(cartListContainer.childNodes[index]);

    totalPrice -= myCart[index].price;
    document.getElementById('totalprice').innerText = 'R' + totalPrice;

    myCart.splice(index,1);
    cartlets.splice(index,1);
   

    for(let i = 0; i < cartlets.length;i++){
        cartlets[i].setIndex(i);
    }
}

function listletClicked(imageDirectory,name){
    let higlightImg = document.getElementById('highlightimg');
    let higlightTxt = document.getElementById('highlighttxt');
    higlightImg.src = imageDirectory;
    higlightTxt.innerText = name;
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
        filteredCards = cards.filter(c => {
            return (productArray[c.index].hats);
        });
    }
    else if(ref === 'acc'){
        filteredCards = cards.filter(c => {
            return (productArray[c.index].accessories);
        });
    }
    else if(ref === 'all'){
        filteredCards = cards.filter(c => {
            return (true);
        });
    }

    loadMoreCards();
    filteredCards[0].card.scrollIntoView();

}

function checkoutClicked(){

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput1.value)){
        if(emailInput1.value === emailInput2.value){

            checkoutProducts(emailInput1.value);
        }
        else{
            alert('Emails do not match. Please check for errors.');
        }
    }
    else{
        alert('Please enter a valid email address.');
    }
}

function checkoutProducts(email){

    myCart.unshift(email);


    const options = {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(myCart)
    };

    sendData(options);
}

async function sendData(options){
    const feedback = await fetch('/send-cart-information',options);
    const answer = await feedback.json();
    alert(answer.feedback);
    window.location.reload();

}










