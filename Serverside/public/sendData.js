
const data = {
    name:"Andries"
};
const options = {
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(data)
};

sendData();

async function sendData(){
    const response = await fetch('/sendData',options);
    const answer = await response.json();
    console.log(answer.status);
}

