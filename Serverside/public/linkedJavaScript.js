





async function sendData(options){
    const response = await fetch('/sendData',options);
    const answer = await response.json();
    console.log(answer.status);
}

function buttonclicked(){
    const inputvalue = document.getElementById("inputfield").value;
    console.log(inputvalue);
    const options = {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            name:inputvalue
        })
    };

    sendData(options);

}

