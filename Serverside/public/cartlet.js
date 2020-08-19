class Cartlet {
    constructor(options){
        this.name = options.name;
        this.code = options.productCode;
        this.price = options.price;
        this.colour = options.colour;
        this.size = options.size;
        this.amount = options.amount;
        this.mainImgDir = options.mainImgDir;
        this.colourImgDir = options.colourImgDir;
    }

    create(index){
        this.index = index;
        this.containerElement = document.createElement('div');
        this.containerElement.className ='listletcontainer';
        this.containerElement.onclick = () => listletClicked(this.mainImgDir,this.name);

        this.mainImgElement = document.createElement('img');
        this.mainImgElement.className = 'primaryimg';
        this.mainImgElement.src = this.mainImgDir;
        this.containerElement.appendChild(this.mainImgElement);

        this.nameElement = document.createElement('h1');
        this.nameElement.className = 'name';
        this.nameElement.innerText = this.name;
        this.containerElement.appendChild(this.nameElement);

        this.colourContainerElement = document.createElement('div');
        this.colourContainerElement.className = 'colourcontainer';
        this.containerElement.appendChild(this.colourContainerElement);
        
        if(this.colourImgDir != ' '){
            this.colourImgElement = document.createElement('img');
            this.colourImgElement.className = 'secondaryimg';
            this.colourImgElement.src = this.colourImgDir;
            this.colourContainerElement.appendChild(this.colourImgElement);
        }
        
        this.colourElement = document.createElement('h2');
        this.colourElement.className = 'colour';
        this.colourElement.innerText = this.colour;
        this.colourContainerElement.appendChild(this.colourElement);

        this.codeElement = document.createElement('h3');
        this.codeElement.className = 'productcode';
        this.codeElement.innerText = this.code + ' - Size: ' + this.size;
        this.containerElement.appendChild(this.codeElement);

        this.priceElement = document.createElement('h2');
        this.priceElement.className = 'price';
        this.priceElement.innerText = ((this.amount > 1) ? this.amount + 'x R' : 'R' ) + this.price;
        this.containerElement.appendChild(this.priceElement);

        this.buttonElement = document.createElement('button');
        this.buttonElement.className = 'removebutton';
        this.buttonElement.innerText = 'remove';
        this.buttonElement.onclick = () => removeFromCart(this.index);
        this.containerElement.appendChild(this.buttonElement);


    }
    appendToContainer(container){
        container.appendChild(this.containerElement);
    }

    setIndex(index){
        this.index = index;
    }
}