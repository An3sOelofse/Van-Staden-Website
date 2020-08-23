let passwordField = document.getElementById('passwordField');
let searchField = document.getElementById('search');
let editCardContainer = document.getElementById('editcardcontainer');

let productData = [];
let cards = [];
let filteredCards = [];


getProductData().then(createCards);

function searchCards(){
    filteredCards = [];
    editCardContainer.innerHTML = '';
    for(let i = 0;i <productData.length;i++){
        if(productData[i].name.toLowerCase().replace(/\s/g, '').includes(searchField.value.toLowerCase().replace(/\s/g, ''))){
            filteredCards[filteredCards.length] = cards[i];
        }
    }
    filteredCards.forEach(card => {
        card.appendToContainer(editCardContainer);
    });
}

function createCards(){
    for(let i = 0; i < productData.length; i++){
        cards[i]= new Card(productData[i],i);
        cards[i].create();
    }
}

async function getProductData(){
    const rawData = await fetch('/get-product-data');
    productData = await rawData.json();
}

async function testPasswordButton(){
    let btn = document.getElementById('testPasswordButton');
    let valid = await checkPassword();
    if(valid){
        btn.classList.add('valid');
        btn.classList.remove('invalid');
        document.getElementById('editItems').classList.remove('invalid');
    }
    else{
        btn.classList.add('invalid');
        btn.classList.remove('valid');
    }
}

async function checkPassword(){

    const options = {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({password:passwordField.value})
    };

    const feedback = await fetch('/test-edit-password',options);
    const answer = await feedback.json();
    return answer.valid;
}