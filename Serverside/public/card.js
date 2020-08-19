class Card {
    constructor(cardInformation,index){
        this.name = cardInformation.name;
        this.colours = cardInformation.colours;
        this.productNumber = cardInformation.productNumber;
        this.sizes = cardInformation.sizes
        this.prices = cardInformation.prices;
        this.index = index;
        this.hasReloaded = false;
    }

    create(){
        this.card = document.createElement('div');
        this.card.className = 'card';

        this.imagecontainer = document.createElement('div');
        this.imagecontainer.className = 'imagecontainer';
        this.card.appendChild(this.imagecontainer);
        
        this.mainimg = document.createElement('img');
        this.mainimg.className = 'mainimg';
        this.imagecontainer.appendChild(this.mainimg);



        this.animationContainer = document.createElement('div');
        this.animationContainer.className = 'animation-container';
        this.imagecontainer.appendChild(this.animationContainer);
        this.loadingAnimationElements = [];

        for(let i = 0;i < 3;i++){
            this.loadingAnimationElements[i] = document.createElement('div');
            this.loadingAnimationElements[i].className = 'loading-anim element-' + i;
            this.animationContainer.appendChild(this.loadingAnimationElements[i]);
        }

        if(this.colours.length > 1){
            this.colorimg = document.createElement('img');
            this.colorimg.className = 'colorimgoff';
            this.imagecontainer.appendChild(this.colorimg);
        }
        this.loadImages(0);

        this.textcontainer = document.createElement('div');
        this.textcontainer.className = 'textcontainer';
        this.card.appendChild(this.textcontainer);

        this.h1 = document.createElement('h1');
        this.h1.textContent = this.name;
        this.textcontainer.appendChild(this.h1);

        this.h2 = document.createElement('h2');
        this.h2.textContent = 'Price: R' + this.prices[0][0];
        this.textcontainer.appendChild(this.h2);
        
        this.h3 = document.createElement('h3');
        this.h3.textContent = 'Product Code: ' + this.productNumber[0];
        this.textcontainer.appendChild(this.h3);
        
        this.section = document.createElement('section');
        this.textcontainer.appendChild(this.section);

            this.selectSize = document.createElement('select');
            this.selectSize.className = 'sizeselect';
            this.selectSize.onchange = () => this.selectSizeChanged();
            this.section.appendChild(this.selectSize);
            this.optionsSize = [];
            for(let i = 0; i < this.sizes.length; i++){
                this.optionsSize[i] = document.createElement('option');
                this.optionsSize[i].value = this.sizes[i];
                this.optionsSize[i].textContent = this.sizes[i];
                this.selectSize.appendChild(this.optionsSize[i]);
            }
        
        if(this.colours.length > 1){

            this.select = document.createElement('select');
            this.select.onchange = () => this.selectChanged();
            this.section.appendChild(this.select);

            this.options = [];
            for(let i = 0; i < this.colours.length; i++){
                this.options[i] = document.createElement('option');
                this.options[i].value = this.colours[i];
                this.options[i].textContent = this.colours[i];
                this.select.appendChild(this.options[i]);
            }
        }

        

        this.button = document.createElement('button');
        this.button.className = (this.colours.length>1) ? 'buttonwithselect' :'buttonalone';
        this.button.textContent = 'Add to Cart';
        this.button.onclick = () => addToCart(this.index,this.selectSize.selectedIndex,(this.colours.length>1) ? this.select.selectedIndex : 0);
        this.section.appendChild(this.button);
       
    }
    appendToContainer(container){
        container.appendChild(this.card);
    }

    loadImages(ind){
        this.hasReloaded = false;

        if(this.colours.length > 1){
            this.mainimg.src = "resources/product images/" + this.name.toLowerCase().replace(/\//,"") + " " + this.colours[ind].toLowerCase().replace(/\//,"") + " copy.jpg";
        }

        else{
            this.mainimg.src = "resources/product images/" + this.name.toLowerCase().replace(/\//,"") + " copy.jpg";
        }

        if (this.colorimg){
            this.colorimg.className = 'colorimgoff';
        }

        this.animationContainer.classList.add('on');
        this.mainimg.addEventListener('load',() => {
            this.animationContainer.classList.remove('on');
        });


        this.mainimg.onerror = () => {
            if(!this.hasReloaded){
                
                this.mainimg.src = "resources/product images/" + this.name.toLowerCase().replace(/\//,"") + " " + this.colours[0].toLowerCase().replace(/\//,"") + " copy.jpg";
                
                if (this.colorimg){
                    this.colorimg.className = 'colorimgon';
                    this.colorimg.src = "resources/images/" + this.colours[ind] + ".jpg";
                }
                console.log(this.name + "does not exists");
                this.hasReloaded = true;
            }
        }
    }

    selectChanged(){
        let index = this.select.selectedIndex;
        this.loadImages(index);
        this.h3.textContent = 'Product Code: ' + this.productNumber[index];
        let sizeIndex = 0;
        if(this.prices.length > 1 && this.colours.length >1){
            index = this.select.selectedIndex;
        }
        if(this.prices[index].length > 0){
            sizeIndex = this.selectSize.selectedIndex;
        }
        this.h2.textContent = 'Price: R' + this.prices[index][sizeIndex];
    }

    selectSizeChanged(){
        let sizeIndex = 0;
        let colourIndex = 0;
        if(this.prices.length > 1 && this.colours.length >1){
            colourIndex = this.select.selectedIndex;
        }
        if(this.prices[colourIndex].length>0){
            sizeIndex = this.selectSize.selectedIndex;
        }
        this.h2.textContent = 'Price: R' + this.prices[colourIndex][sizeIndex];
    }

    getMainImgDir(){
        return this.mainimg.src;
    }

    getColourImgDir(){
        if(this.colours.length > 1){
            (this.colorimg.className == 'colorimgoff') ? ' ' : this.mainimg.src;
        }
        return ' ';
       
    }

}