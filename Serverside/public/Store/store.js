

let productArray = [];
let container = document.getElementById("cardcontainer");
let cards = [];


async function getProductData(){
    const rawData = await fetch('/cardInfo');
    return await rawData.json();
}

function createCards(){
     for(let i = 0; i < productArray.length; i++){
          cards[i]= new Card(productArray[i],i);
          cards[i].create(container);
     }
}

getProductData().then(data => {
    productArray = data;
    createCards();
});







