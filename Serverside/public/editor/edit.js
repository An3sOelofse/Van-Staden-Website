let passwordField = document.getElementById('passwordField');


async function testPasswordButton(){
    let btn = document.getElementById('testPasswordButton');
    let valid = await checkPassword();
    if(valid){
        btn.classList.add('valid');
        btn.classList.remove('invalid');
        if(!document.getElementById('link')){
            let link = document.createElement('a');
            link.id = 'link';
            link.innerText = 'download csv';
            link.href = './product-list-data.csv';
            console.log(link);
            document.getElementById('linkContainer').appendChild(link);
        }
        document.getElementById('upload-csv').classList.remove('hidden');
       
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

