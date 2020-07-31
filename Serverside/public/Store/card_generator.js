let container = document.getElementById("cardContainer");



function createCard(cardObject){
    let card = document.createElement('div');
    card.className = 'card';
    console.log('created');

    let imagecontainer = document.createElement('div');
    imagecontainer.className = 'imagecontainer';
    card.appendChild(imagecontainer);
    
    let mainimg = document.createElement('img');
    mainimg.src = "../resources/images/" + cardObject.name + ".png";
    mainimg.className = 'mainimg';
    imagecontainer.appendChild(mainimg);

    let colorimg = document.createElement('img');
    colorimg.src = "../resources/images/" + cardObject.colours[1] + ".jpg";
    colorimg.className = 'colorimg';
    imagecontainer.appendChild(colorimg);

    let textcontainer = document.createElement('div');
    textcontainer.className = 'textcontainer';
    card.appendChild(textcontainer);

    let h1 = document.createElement('h1');
    h1.textContent = cardObject.name;
    textcontainer.appendChild(h1);

    let h2 = document.createElement('h2');
    h2.textContent = 'Price: R' + cardObject.price;
    textcontainer.appendChild(h2);
    
    let h3 = document.createElement('h3');
    h3.textContent = 'Product Code: ' + cardObject.productNumber[1];
    textcontainer.appendChild(h3);
    
    let section = document.createElement('section');
    textcontainer.appendChild(section);

    let select = document.createElement('select');
    select.id = 'color ' + cardObject.name;
    section.appendChild(select);

    for(let i = 0; i < cardObject.colours.length; i++){
        let option = document.createElement('option');
        option.value = cardObject.colours[i];
        option.textContent = cardObject.colours[i];
        select.appendChild(option);
    }

    let button = document.createElement('button');
    button.textContent = 'Add to Cart';
    section.appendChild(button);

    let cardContainer = document.getElementById('cardcontainer');
    cardContainer.appendChild(card);


}