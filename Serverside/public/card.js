class Card {
    constructor(cardInformation,index){
        this.name = cardInformation.name;
        this.colours = cardInformation.colours;
        this.productNumber = cardInformation.productNumber;
        this.price = cardInformation.price;
        this.index = index;
        this.hasReloaded = false;
    }

    create(container){
        this.card = document.createElement('div');
        this.card.className = 'card';

        this.imagecontainer = document.createElement('div');
        this.imagecontainer.className = 'imagecontainer';
        this.card.appendChild(this.imagecontainer);
        
        this.mainimg = document.createElement('img');
        if(this.colours.length > 1){
            this.mainimg.src = "resources/product images/" + this.name.toLowerCase().replace(/\//,"") + " " + this.colours[0].toLowerCase() + ".png";
        }
        else{
            this.mainimg.src = "resources/product images/" + this.name.toLowerCase().replace(/\//,"") + ".png";
        }
       

        this.mainimg.className = 'mainimg';
        this.imagecontainer.appendChild(this.mainimg);

        if(this.colours.length > 1){
            this.colorimg = document.createElement('img');
            //this.colorimg.src = "../resources/images/" + this.colours[0] + ".jpg";
            this.colorimg.className = 'colorimgoff';
            this.imagecontainer.appendChild(this.colorimg);
        }

        this.textcontainer = document.createElement('div');
        this.textcontainer.className = 'textcontainer';
        this.card.appendChild(this.textcontainer);

        this.h1 = document.createElement('h1');
        this.h1.textContent = this.name;
        this.textcontainer.appendChild(this.h1);

        this.h2 = document.createElement('h2');
        this.h2.textContent = 'Price: R' + this.price;
        this.textcontainer.appendChild(this.h2);
        
        this.h3 = document.createElement('h3');
        this.h3.textContent = 'Product Code: ' + this.productNumber[0];
        this.textcontainer.appendChild(this.h3);
        
        this.section = document.createElement('section');
        this.textcontainer.appendChild(this.section);
        
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
        //this.button.onclick = () => this.optionChanged();
        this.section.appendChild(this.button);

        container.appendChild(this.card);
       
    }

    logMessage(message){
        console.log('card no ' + this.index + ': ' + message);
    }

    selectChanged(){

        let ind = this.select.selectedIndex;
        this.hasReloaded = false;
        this.h3.textContent = 'Product Code: ' + this.productNumber[ind];
            this.mainimg.src = "resources/product images/" + this.name.replace(/\//,"") + " " + this.colours[ind] + ".png"
            this.colorimg.className = 'colorimgoff';
        
        this.mainimg.onerror = () => {
            if(!this.hasReloaded){
                if(this.colours.length > 1){
                    this.mainimg.src = "resources/product images/" + this.name.toLowerCase().replace(/\//,"") + " " + this.colours[0].toLowerCase() + ".png";
                }
                else{
                    this.mainimg.src = "resources/product images/" + this.name.toLowerCase().replace(/\//,"") + ".png";
                }
                this.colorimg.className = 'colorimgon';
                this.colorimg.src = "resources/images/" + this.colours[ind] + ".jpg";
                console.log(this.name + "does not exists");
                this.hasReloaded = true;
            }
        }
    }


}