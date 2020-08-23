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

        this.h1 = document.createElement('input');
        this.h1.className = 'input-element';
        this.h1.value = this.name;
        this.textcontainer.appendChild(this.h1);

        this.h2 = document.createElement('input');
        this.h2.className = 'input-element';
        this.h2.value = JSON.stringify(this.prices);
        this.textcontainer.appendChild(this.h2);
        
        this.h3 = document.createElement('input');
        this.h3.className = 'input-element';
        this.h3.value = JSON.stringify(this.productNumber);
        this.textcontainer.appendChild(this.h3);
        
        this.section = document.createElement('section');
        this.textcontainer.appendChild(this.section);

        this.selectSize = document.createElement('input');
        this.selectSize.className = 'input-element';
        this.selectSize.value = JSON.stringify(this.sizes);
        this.section.appendChild(this.selectSize);

        this.select = document.createElement('input');
        this.select.className = 'input-element';
        this.select.value = JSON.stringify(this.colours);
        this.section.appendChild(this.select);        

        this.button = document.createElement('button');
        this.button.className = 'buttonalone';
        this.button.textContent = 'Submit Changes';
        this.section.appendChild(this.button);
       
    }

    appendToContainer(container){
        container.appendChild(this.card);
    }

    loadImages(ind){
        this.hasReloaded = false;

        if(this.colours.length > 1){
            this.mainimg.src = "../resources/product images/" + this.name.toLowerCase().replace(/\//,"") + " " + this.colours[ind].toLowerCase().replace(/\//,"") + " copy.jpg";
        }

        else{
            this.mainimg.src = "../resources/product images/" + this.name.toLowerCase().replace(/\//,"") + " copy.jpg";
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
                
                this.mainimg.src = "../resources/product images/" + this.name.toLowerCase().replace(/\//,"") + " " + this.colours[0].toLowerCase().replace(/\//,"") + " copy.jpg";
                
                if (this.colorimg){
                    this.colorimg.className = 'colorimgon';
                    this.colorimg.src = "../resources/colour%20images/" + this.colours[ind].toLowerCase().replace(/\//,"") + ".png";
                }
                console.log(this.name + "does not exists");
                this.hasReloaded = true;
            }
        }
    }

    getMainImgDir(){
        return this.mainimg.src;
    }

    getColourImgDir(){
        if(this.colours.length > 1){
            return (this.colorimg.className == 'colorimgoff') ? ' ' : this.colorimg.src;
        }
        return ' ';
       
    }

}